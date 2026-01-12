$(function () {
  $("#header").load("header.html");
  $("#footer").load("footer.html");

  function revealInView($els, baseDelay = 120, offset = 140) {
    const winH = $(window).height();
    const winTop = $(window).scrollTop();
    $els.each(function (i) {
      const $el = $(this);
      if ($el.hasClass("on")) return;
      const top = $el.offset().top;
      if (top < winTop + winH - offset) {
        setTimeout(() => $el.addClass("on"), i * baseDelay);
      }
    });
  }

  function runReveals(ctx) {
    const $ctx = ctx ? $(ctx) : $(document);
    revealInView($ctx.find(".con_w, .lesson-card, .apply-box"));
  }
  runReveals();
  $(window).on("scroll resize", () => runReveals());

  function activateTab(id) {
    const $target = $("#" + id);
    $(".sub_tab li").removeClass("on");
    $(`.sub_tab a[data-target='${id}']`).parent().addClass("on");

    $(".tab-content").removeClass("active").hide();
    $target.find(".con_w, .lesson-card, .apply-box").removeClass("on");

    $target.fadeIn(180, function () {
      $target.addClass("active");
      runReveals($target);
    });
  }

  $(".sub_tab a").on("click", function (e) {
    e.preventDefault();
    const id = $(this).data("target");
    activateTab(id);
    history.replaceState(null, "", "#" + id);
  });

  const hash = (location.hash || "#class").replace("#", "");
  activateTab(hash);


// --------------------------------
// Fade-left animation (문단 순차 등장)
// --------------------------------
function revealLeft($els, baseDelay = 120, offset = 120) {
  const winH = $(window).height();
  const winTop = $(window).scrollTop();
  $els.each(function (i) {
    const $el = $(this);
    if ($el.hasClass("on")) return;
    const top = $el.offset().top;
    if (top < winTop + winH - offset) {
      setTimeout(() => $el.addClass("on"), i * baseDelay);
    }
  });
}

// 기존 runReveals() 안에 추가
function runReveals(ctx) {
  const $ctx = ctx ? $(ctx) : $(document);
  revealInView($ctx.find(".con_w, .lesson-card, .apply-box"));
  revealLeft($ctx.find(".fade-left"));
}

// --------------------------------
// Fade-left / Fade-right animation (이미지 + 문단 순차 등장)
// --------------------------------
function revealSlide($els, baseDelay = 120, offset = 120) {
  const winH = $(window).height();
  const winTop = $(window).scrollTop();
  $els.each(function (i) {
    const $el = $(this);
    if ($el.hasClass("on")) return;
    const top = $el.offset().top;
    if (top < winTop + winH - offset) {
      setTimeout(() => $el.addClass("on"), i * baseDelay);
    }
  });
}

// runReveals()에 추가
function runReveals(ctx) {
  const $ctx = ctx ? $(ctx) : $(document);
  revealInView($ctx.find(".con_w, .lesson-card, .apply-box"));
  revealSlide($ctx.find(".fade-left, .fade-right, .edu-img"));
}

  // 스크롤 등장 애니메이션
  function revealElements($els, offset = 150) {
    const winH = $(window).height();
    const winTop = $(window).scrollTop();
    $els.each(function(){
      const $el = $(this);
      if($el.hasClass("on")) return;
      const top = $el.offset().top;
      if(top < winTop + winH - offset){
        $el.addClass("on");
      }
    });
  }

  function runReveals() {
    revealElements($(".fade-up, .fade-left, .fade-right"));
  }
  runReveals();
  $(window).on("scroll resize", runReveals);

  // 도트 빛남 효과
  $(window).on("scroll", function(){
    $(".lesson-item").each(function(){
      const top = $(this).offset().top;
      if($(window).scrollTop() + $(window).height() > top + 100){
        $(this).addClass("glow");
      }
    });
  });


});
