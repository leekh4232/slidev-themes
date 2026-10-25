// 흰 슬라이드 위의 어두운 코드 상자에 잘 보이도록 고대비 테마를 쓴다(주석도 밝은 회색).
// defineShikiSetup(@slidev/types)은 받은 함수를 그대로 돌려줄 뿐이라 쓰지 않는다.
// 쓰면 테마 폴더를 경로(theme: ./hossam)로 열 때 그 패키지를 찾지 못해 실행이 멈춘다.
export default () => ({
  themes: { dark: 'github-dark-high-contrast', light: 'github-dark-high-contrast' },
})
