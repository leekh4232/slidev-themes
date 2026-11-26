"""빌드한 예제 덱에서 매뉴얼용 미리보기(960×540 jpg)를 찍는다.

사용법:
  python3 tools/capture.py <빌드 폴더> <저장 접두어> <쪽:이름,...> [--mode dark|light]

예:
  npx -y -p @slidev/cli -p @slidev/theme-default slidev build docs/examples/lab-example.md --out /tmp/lab-dist
  python3 tools/capture.py /tmp/lab-dist docs/img/lab "1:cover,2:section,5:problem" --mode dark

- 빌드 폴더를 루트로 띄운다(하위 경로로 열면 자원 경로가 깨져 빈 화면이 나온다)
- 사이드바는 접고 ☰ 버튼은 숨겨 슬라이드만 찍는다(--sidebar 를 주면 펼친 채 찍는다). 애니메이션을 꺼서 클릭 단계(v-click)가 모두 보인 상태로 찍는다
- 저장 이름: <저장 접두어>-<이름>.jpg
"""
import argparse
import http.server
import socketserver
import threading
from pathlib import Path

from playwright.sync_api import sync_playwright

INIT = """
try {
  localStorage.setItem('pyai-sidebar-open', '0');
  localStorage.setItem('pyai-anim', '0');
  localStorage.setItem('pyai-dark-init', '1');
  localStorage.removeItem('pyai-zoom');
} catch (e) {}
"""
# 지금 쪽의 레이아웃이 그려질 때까지 기다린다(다른 쪽 레이아웃은 숨어 있어 폭이 0)
WAIT = "[...document.querySelectorAll('.slidev-layout')].some(e => e.getBoundingClientRect().width > 0)"
HIDE = ".toc-float, .slidev-nav, #slidev-goto-dialog { display: none !important; }"


def serve(root: str) -> tuple[socketserver.TCPServer, int]:
    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kw):
            super().__init__(*args, directory=root, **kw)

        def log_message(self, *args):
            pass

        def send_head(self):
            # Slidev 는 /3 같은 경로로 쪽을 연다 → 없는 파일이면 index.html 을 준다(SPA)
            if not Path(self.translate_path(self.path)).exists():
                self.path = "/index.html"
            return super().send_head()

    class Server(socketserver.TCPServer):
        allow_reuse_address = True

    httpd = Server(("127.0.0.1", 0), Handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, httpd.server_address[1]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("dist")
    ap.add_argument("prefix")
    ap.add_argument("shots", help="쪽:이름 을 쉼표로 이은 목록")
    ap.add_argument("--mode", choices=["dark", "light"], default="dark")
    ap.add_argument("--sidebar", action="store_true", help="목차 사이드바를 펼친 채 찍는다")
    a = ap.parse_args()

    httpd, port = serve(a.dist)
    Path(a.prefix).parent.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(viewport={"width": 1280, "height": 720}, device_scale_factor=0.75)
        ctx.add_init_script(INIT)
        if a.sidebar:
            ctx.add_init_script("try { localStorage.setItem('pyai-sidebar-open', '1') } catch (e) {}")
        page = ctx.new_page()
        for item in a.shots.split(","):
            no, name = item.strip().split(":")
            page.goto(f"http://127.0.0.1:{port}/{no}", wait_until="networkidle")
            page.wait_for_function(WAIT)  # 늦게 그려지면 빈 화면이 찍힌다
            page.add_style_tag(content=HIDE)
            is_dark = page.evaluate("document.documentElement.classList.contains('dark')")
            if is_dark != (a.mode == "dark"):
                page.keyboard.press("d")
            page.evaluate("document.fonts.ready")
            page.wait_for_timeout(1800)
            out = f"{a.prefix}-{name}.jpg"
            page.screenshot(path=out, type="jpeg", quality=86)
            over = page.locator(".over-tag")
            note = f"  ⚠ {over.first.inner_text()}" if over.count() else ""
            print(f"{out}{note}")
        browser.close()
    httpd.shutdown()


if __name__ == "__main__":
    main()
