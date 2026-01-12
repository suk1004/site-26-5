$(function () {

  // ================== 페이지 로드 시 헤더 내려오기 ==================
  const $header = $("header");
  $header.addClass("load");
  const baseHeight = 100; // 기본 헤더 높이

  // ================== GNB hover 시 header 확장 ==================
  $(".gnb .top-menu").hover(
    function () {
      const $sub = $(this).find(".sub");
      if ($sub.length > 0) {
        const subHeight = $sub.outerHeight(); // 실제 높이
        $header.addClass("active").css("height", baseHeight + subHeight);
      }
    },
    function () {
      $header.removeClass("active").css("height", baseHeight);
    }
  );

  // ================== 로고 채움 유틸 ==================
  const SCROLLING_MS = 700; // fullPage scrollingSpeed와 맞춤
  let currentFill = 0;      // 0 ~ 1
  let rafId = null;

  function setFill(progress) {
    currentFill = Math.max(0, Math.min(1, progress));
    const total = 512;
    const h = total * currentFill;
    const y = total - h;
    const fillRect = document.getElementById("fillRect");
    if (fillRect) {
      fillRect.setAttribute("height", h);
      fillRect.setAttribute("y", y);
    }
  }

  function animateFillTo(target, duration) {
    cancelAnimationFrame(rafId);
    const start = currentFill;
    const startTime = performance.now();

    function tick(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const val = start + (target - start) * t;
      setFill(val);
      if (t < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
  }

  function isFullpageEnabled() {
    return $("html").hasClass("fp-enabled");
  }

  function getActiveSectionIndex() {
    if (window.fullpage_api && typeof window.fullpage_api.getActiveSection === "function") {
      // v3
      return window.fullpage_api.getActiveSection().index; // 0-based
    }
    // v2 fallback
    const $active = $("#fullpage .section.active, #fullpage .fp-section.active").first();
    const i = $active.index();
    return i >= 0 ? i : 0;
  }

  function targetFillForSection(idx0) {
    // 섹션0(첫 화면)=0, 나머지=1
    return idx0 > 0 ? 1 : 0;
  }

  // ================== Header 전체 hover 시 효과 ==================
  $header.on("mouseenter", function () {
    if (!$header.hasClass("down")) {
      $header.addClass("hover");
      animateFillTo(1, 300); // 로고도 풀컬러
    }
  });

  $header.on("mouseleave", function () {
    if (!$header.hasClass("down")) {
      $header.removeClass("hover");
      const progress = Math.max(0, Math.min(1, window.scrollY / window.innerHeight));
      animateFillTo(progress, 300);
    }
  });

  // ================== 스크롤 시 hover 효과와 동일하게 ==================
  $(window).on("scroll", function () {
    if (window.scrollY > 0) {
      // 스크롤이 내려가면 hover 상태처럼
      if (!$header.hasClass("hover")) {
        $header.addClass("hover");
      }
      animateFillTo(1, 500); // 로고 컬러 채움
    } else {
      // 맨 위로 올라가면 hover 해제
      $header.removeClass("hover");
      animateFillTo(0, 500); // 로고 라인만 보이게
    }
  });

  // 초기 상태: 첫 섹션 = 0
  setFill(0);











  
 // 로그인 아이콘 클릭 시 모달 열기
  $(".top-menu-icon .icon-login").on("click", function (e) {
    e.preventDefault();
    const $modal = $("#loginModal");
    const $content = $modal.find(".login-content");

    // 기존 내용 초기화 후 login.html 중 필요한 부분만 로드
    $content.empty().load("login.html .modal_login", function () {
      $modal.fadeIn(200).css("display", "flex");
      $("body").addClass("modal-open");
    });
  });

  // 닫기 버튼 또는 오버레이 클릭 시 닫기
  $(document).on("click", ".close-login, .login-overlay", function () {
    $("#loginModal").fadeOut(200, function () {
      $("body").removeClass("modal-open");
      $("#loginModal .login-content").empty();
    });
  });

});
