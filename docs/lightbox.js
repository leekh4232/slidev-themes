// 미리보기 격자(.gallery)의 그림을 누르면 jpg 로 이동하지 않고 그 자리에서 크게 띄운다.
// ← → 로 앞뒤 그림, Esc · 바깥 누르기 · × 로 닫는다. 스크립트가 없으면 링크가 그대로 jpg 를 연다.
(function () {
  var links = [].slice.call(document.querySelectorAll('.gallery a[href$=".jpg"], .gallery a[href$=".png"]'));
  if (!links.length) return;
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', '미리보기');
  box.hidden = true;
  box.innerHTML =
    '<button type="button" class="lb-close" aria-label="닫기">×</button>' +
    '<button type="button" class="lb-prev" aria-label="이전 그림">‹</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button type="button" class="lb-next" aria-label="다음 그림">›</button>' +
    '<div class="lb-count"></div>';
  document.body.appendChild(box);
  var img = box.querySelector('img'), cap = box.querySelector('figcaption'), count = box.querySelector('.lb-count');
  var cur = 0, last = null;

  function show(i) {
    cur = (i + links.length) % links.length;
    var a = links[cur], thumb = a.querySelector('img'), fc = a.parentNode.querySelector('figcaption');
    img.src = a.href;
    img.alt = thumb ? thumb.alt : '';
    cap.innerHTML = fc ? fc.innerHTML : '';
    count.textContent = (cur + 1) + ' / ' + links.length;
  }
  function open(i) {
    last = document.activeElement;
    show(i);
    box.hidden = false;
    document.documentElement.classList.add('lb-open');
    box.querySelector('.lb-close').focus();
  }
  function close() {
    box.hidden = true;
    img.removeAttribute('src');
    document.documentElement.classList.remove('lb-open');
    if (last && last.focus) last.focus();
  }

  links.forEach(function (a, i) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;   // 새 탭으로 열기는 그대로 둔다
      e.preventDefault();
      open(i);
    });
  });
  box.addEventListener('click', function (e) {
    var t = e.target;
    if (t.classList.contains('lb-prev')) show(cur - 1);
    else if (t.classList.contains('lb-next')) show(cur + 1);
    else if (t === box || t.classList.contains('lb-close')) close();
  });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(cur - 1);
    else if (e.key === 'ArrowRight') show(cur + 1);
    else if (e.key === 'Tab') {   // 초점을 창 안에 가둔다
      var b = [].slice.call(box.querySelectorAll('button')), k = b.indexOf(document.activeElement);
      e.preventDefault();
      b[(k + (e.shiftKey ? -1 : 1) + b.length) % b.length].focus();
    }
  });
})();
