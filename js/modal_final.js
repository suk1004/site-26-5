$(document).ready(function(){

  /* =========================================
    FRITZ MODAL SCRIPT (최종 정리 버전)
  ========================================= */

  // ────────────── 1. Body Scroll Lock / Unlock ──────────────
  function lockBodyScroll() {
    if (document.body.classList.contains('modal-open')) return;

    const y = window.scrollY || document.documentElement.scrollTop || 0;
    document.body.dataset.scrollY = String(y);
    document.body.style.top = `-${y}px`;
    document.body.classList.add('modal-open');
  }

  function unlockBodyScroll() {
    const y = parseInt(document.body.dataset.scrollY || '0', 10);
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    window.scrollTo(0, y || 0);
    delete document.body.dataset.scrollY;
  }

  // ────────────── 2. Modal Open ──────────────
  $(".menu-card").on("click", function(){
    const imgSrc = $(this).data("img");
    if (!imgSrc) return;

    const $modal = $("#shopModal");
    const $content = $modal.find(".modal-content");

    $content.html('<img src="' + imgSrc + '" alt="menu item">');
    $modal.fadeIn(160, function(){
      $modal.attr("aria-hidden", "false");
      $modal.find(".close").attr("aria-label", "Close dialog").focus();
    });

    // Fullpage.js 스크롤 비활성화
    if (typeof fullpage_api !== "undefined") {
      fullpage_api.setAllowScrolling(false);
      fullpage_api.setKeyboardScrolling(false);
    }

    lockBodyScroll();
  });

  // ────────────── 3. Modal Close ──────────────
  function closeModal() {
    const $modal = $("#shopModal");
    $modal.fadeOut(160, function(){
      $modal.attr("aria-hidden", "true");
    });

    // Fullpage.js 스크롤 복원
    if (typeof fullpage_api !== "undefined") {
      fullpage_api.setAllowScrolling(true);
      fullpage_api.setKeyboardScrolling(true);
    }

    unlockBodyScroll();
  }

  // 닫기 버튼 클릭
  $("#shopModal").on("click", ".close", function(e){
    e.preventDefault();
    closeModal();
  });

  // backdrop 클릭 시 닫기
  $("#shopModal").on("click", function(e){
    if (e.target === this) closeModal();
  });

  // ESC 키로 닫기
  $(document).on("keydown.modalEsc", function(e){
    if (e.key === "Escape" && $("#shopModal:visible").length > 0) {
      e.preventDefault();
      closeModal();
    }
  });

  // ────────────── 4. Scroll Control ──────────────
  // 내부 스크롤만 허용
  $("#shopModal .c1")
    .on("wheel touchmove", function(e){ e.stopPropagation(); });

  // 배경(backdrop)에서 스크롤 완전 차단
  $("#shopModal").on("wheel touchmove", function(e){
    if (e.target === this) e.preventDefault();
  });

  // ────────────── 5. Focus Trap (접근성) ──────────────
  $(document).on("keydown.modalTrap", function(e){
    const $modal = $("#shopModal:visible");
    if (!$modal.length || e.key !== "Tab") return;

    const focusable = $modal.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]')
                            .filter(':visible');
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

});
