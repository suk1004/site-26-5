// quickmenu.html 삽입
document.addEventListener("DOMContentLoaded", () => {
  fetch("quickmenu.html")
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);
    })
    .catch(err => console.error("❌ quickmenu.html 로드 실패:", err));
});

// quick-top 버튼 클릭 → 무조건 맨 위로 스크롤
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".quick-top");
  if (!btn) return;

  e.preventDefault();

  // ✅ fullpage API 무시하고 그냥 스크롤 최상단으로
  window.scrollTo({ top: 0, behavior: "smooth" });
});

