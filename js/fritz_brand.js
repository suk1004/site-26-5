$(function () {
  // Header / Footer
  $("#header").load("header.html");
  $("#footer").load("footer.html");

  /* ========== Scroll Reveal  ========== */
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
    revealInView($ctx.find(".con_w"));
    revealInView($ctx.find(".p01.left, .p01.right"), 120, 120);
    revealInView($ctx.find(".final_img, .final_txt p"), 120, 120);
  }
  runReveals();
  $(window).on("scroll resize", () => runReveals());

  /* ========== Tabs (기존 마크업/URL 해시 동일) ========== */
  function activateTab(id) {
    const $target = $("#" + id);
    $(".sub_tab li").removeClass("on");
    $(`.sub_tab a[data-target="${id}"]`).parent().addClass("on");

    $(".tab-content").removeClass("active").hide();
    $target.find(".con_w, .p01.left, .p01.right, .final_img, .final_txt p").removeClass("on");

    $target.fadeIn(180, function () {
      $target.addClass("active");
      runReveals($target);
      setTimeout(() => runReveals($target), 60);
    });
  }
  $(".sub_tab a").on("click", function (e) {
    e.preventDefault();
    const id = $(this).data("target");
    activateTab(id);
    history.replaceState(null, "", "#" + id);
  });
  const hash = (location.hash || "#brand").replace("#", "");
  activateTab(hash === "cibi" ? "cibi" : "brand");

  /* ========== 안전장치: 모션 감소 설정 준수 ========== */
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches){
    $(document).off("mousemove");
    $(".sub_tab a").off("mousemove mouseleave");
  }
});

