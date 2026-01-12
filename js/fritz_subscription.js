$(document).ready(function () {
  // Header / Footer 불러오기
  $("#header").load("header.html");
  $("#footer").load("footer.html");

  // 스크롤 애니메이션 (fade-up / fade-left / fade-right)
  function animateOnScroll() {
    $(".fade-up, .fade-left, .fade-right").each(function () {
      const $el = $(this);
      const elTop = $el.offset().top;
      const winTop = $(window).scrollTop();
      const winH = $(window).height();

      if (elTop < winTop + winH - 100) {
        $el.addClass("on");
      }
    });
  }

  $(window).on("scroll", animateOnScroll);
  animateOnScroll(); // 초기 실행
});
