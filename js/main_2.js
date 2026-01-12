$(function () {

  $("#header").load("header.html");

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
    return $('html').hasClass('fp-enabled');
  }
  function getActiveSectionIndex() {
    if (window.fullpage_api && typeof window.fullpage_api.getActiveSection === 'function') {
      // v3
      return window.fullpage_api.getActiveSection().index; // 0-based
    }
    // v2 fallback
    const $active = $('#fullpage .section.active, #fullpage .fp-section.active').first();
    const i = $active.index();
    return i >= 0 ? i : 0;
  }
  function targetFillForSection(idx0) {
    // 섹션0(첫 화면)=0, 나머지=1
    return idx0 > 0 ? 1 : 0;
  }

  // ================== fullPage 초기화 ==================
  function fullpageActivate() {
    $('#fullpage').fullpage({
      anchors: ['section1', 'section2', 'section3', 'section4', 'section5', 'footer'],
      navigation: false,
      autoScrolling: true,
      scrollBar: false,
      scrollingSpeed: SCROLLING_MS,
      sectionsColor: [
        '#f3e8d8ff',
        'linear-gradient(135deg, #e6f7f2, #d3f0e3)',
        'linear-gradient(135deg, #f6f1ea, #ede2d5)',
        'linear-gradient(135deg, #fceaea, #f5d1d1, #e6b3b3)',
        'linear-gradient(135deg, #f0f6fb, #e2eef7);'
      ],

      afterLoad: function (a, b) {
        const idx = (typeof b === 'object') ? b.index : (b - 1);
        $('header').toggleClass('down', idx > 0);
        animateFillTo(targetFillForSection(idx), SCROLLING_MS);
      },

      onLeave: function (a, b) {
        const idx = (typeof b === 'object') ? b.index : (b - 1);
        $('header').toggleClass('down', idx > 0);
        animateFillTo(targetFillForSection(idx), SCROLLING_MS);
      },

      // ✅ fullpage 준비 후 quick-top 버튼 이벤트 연결
      afterRender: function () {
        console.log("✅ fullpage 준비 완료 (quick-top 버튼 연결)");

        $(document).off("click.quickTop").on("click.quickTop", ".quick-top", function (e) {
          e.preventDefault();
          try {
            if (window.fullpage_api && typeof window.fullpage_api.moveTo === "function") {
              window.fullpage_api.moveTo(1, 1); // 첫 섹션 이동
              console.log("✅ quick-top → 1페이지 이동");
            } else if ($.fn.fullpage && typeof $.fn.fullpage.moveTo === "function") {
              $.fn.fullpage.moveTo(1, 1);
              console.log("✅ quick-top → 1페이지 이동 (jQuery 방식)");
            } else {
              console.warn("⚠️ fullpage.moveTo 없음 → fallback 실행");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          } catch (err) {
            console.error("❌ fullpage 이동 오류:", err);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
      }
    });
  }
  fullpageActivate();

  // 반응형: 768 이하 → fullPage 해제하고 네이티브 스크롤로 채움
  function nativeScrollHandler() {
    const progress = Math.max(0, Math.min(1, window.scrollY / window.innerHeight));
    setFill(progress);
  }
  function enableNativeScrollFill() {
    nativeScrollHandler();
    window.addEventListener('scroll', nativeScrollHandler, { passive: true });
  }
  function disableNativeScrollFill() {
    window.removeEventListener('scroll', nativeScrollHandler);
  }

  $(window).on('resize', function () {
    if ($(this).width() <= 768) {
      if ($.fn.fullpage.destroy) $.fn.fullpage.destroy('all');
      if (!isFullpageEnabled()) enableNativeScrollFill();
    } else {
      if (!isFullpageEnabled()) {
        fullpageActivate();
        disableNativeScrollFill();
        const idx = getActiveSectionIndex();
        setFill(targetFillForSection(idx));
      }
    }
  }).trigger('resize');

  // ================== 비주얼 슬라이드 ==================
  const visSlider = $('.visual .visual-slider li');
  const visNav = $('.visual-nav li');
  const visLength = visSlider.length - 1;

  function first() {
    visSlider.eq(0).addClass('On');
    visNav.eq(0).addClass('active');
  }
  first();

  setInterval(slideEvent, 5000);

  function slideEvent() {
    let i = $('.visual-slider li.On').index();
    reset();
    if (i < visLength) {
      visSlider.eq(i + 1).addClass('On');
      visNav.eq(i + 1).addClass('active');
    } else {
      visSlider.eq(0).addClass('On');
      visNav.eq(0).addClass('active');
    }
  }

  visNav.on('click', function () {
    let i = $(this).index();
    reset();
    $(this).addClass("active");
    visSlider.eq(i).addClass("On");
  });

  function reset() {
    visSlider.removeClass("On");
    visNav.removeClass("active");
  }

  // ================== Header 전체 hover 시 효과 ==================
  const $header = $('header');

  $header.on('mouseenter', function () {
    if (!$header.hasClass('down')) {
      $header.addClass('hover');
      animateFillTo(1, 300); // 로고도 풀컬러
    }
  });
  $header.on('mouseleave', function () {
    if (!$header.hasClass('down')) {
      $header.removeClass('hover');
      const progress = Math.max(0, Math.min(1, window.scrollY / window.innerHeight));
      animateFillTo(progress, 300);
    }
  });

  // 초기 상태: 첫 섹션 = 0
  setFill(0);

  // ================== 섹션 전용 함수 ==================
  function sec3() {
    $(".about_contents p:nth-child(2)").delay(200).animate({ top: "0" }, 700, function () {
      $(".about_contents p:nth-child(1)").delay(300).animate({ right: "270px", opacity: "1" }, 700);
    });
  }
  function sec4() {
    console.log("Section 4 activated");
  }

  // ani.css 스크롤 인터랙션
  function aniOnScroll() {
    document.querySelectorAll('.ani').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        el.classList.add('moving');
      }
    });
  }

  window.addEventListener('scroll', aniOnScroll);
  window.addEventListener('load', aniOnScroll);
});

