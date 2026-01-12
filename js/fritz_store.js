$(document).ready(function () {
  // Header & Footer 불러오기
  $("#header").load("header.html");
  $("#footer").load("footer.html");

  // ──────────────────────────────
  // Scroll Animation Trigger
  // ──────────────────────────────
  function scrollAnimate() {
    const winTop = $(window).scrollTop();
    const winH = $(window).height();

    $(".fade-up, .fade-left, .fade-right").each(function () {
      const elTop = $(this).offset().top;
      if (elTop < winTop + winH - 100) $(this).addClass("on");
    });

    // Blob 움직임
    const bgTop = $(".bg-decor").offset().top;
    if (winTop + winH / 2 > bgTop) {
      $(".bg-decor").addClass("active");
    } else {
      $(".bg-decor").removeClass("active");
    }
  }

  $(window).on("scroll load", scrollAnimate);
  scrollAnimate();
});
