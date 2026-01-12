$(document).ready(function () {
  $("#header").load("header.html");
  $("#footer").load("footer.html");

  // 탭 전환
  $(".sub_tab a").on("click", function (e) {
    e.preventDefault();
    const target = $(this).data("target");

    $(".sub_tab li").removeClass("on");
    $(this).parent().addClass("on");

    $(".tab-content").removeClass("active").css({ opacity: 0, zIndex: 0 });
    $("#" + target).addClass("active").css({ opacity: 1, zIndex: 1 });
  });

  // 공지사항 아코디언
  $(".notice-list .n-btn").on("click", function () {
    const $li = $(this).closest("li");
    const $answer = $li.find(".answer");

    if ($li.hasClass("active")) {
      $answer.stop(true, true).slideUp(300);
      $li.removeClass("active");
    } else {
      $(".notice-list li.active .answer").stop(true, true).slideUp(300);
      $(".notice-list li").removeClass("active");
      $li.addClass("active");
      $answer.stop(true, true).slideDown(300);
    }
  });

  // QnA 아코디언
  $(".qna-list .q-btn").on("click", function () {
    const $li = $(this).closest("li");
    const $answer = $li.find(".answer");

    if ($li.hasClass("active")) {
      $answer.stop(true, true).slideUp(300);
      $li.removeClass("active");
    } else {
      $(".qna-list li.active .answer").stop(true, true).slideUp(300);
      $(".qna-list li").removeClass("active");
      $li.addClass("active");
      $answer.stop(true, true).slideDown(300);
    }
  });

  // 스크롤 등장
  function fadeOnScroll() {
    $(".fade-up").each(function () {
      const pos = $(this).offset().top;
      const winTop = $(window).scrollTop();
      const winH = $(window).height();
      if (pos < winTop + winH - 100) $(this).addClass("on");
    });
  }
  $(window).on("scroll load", fadeOnScroll);
});
