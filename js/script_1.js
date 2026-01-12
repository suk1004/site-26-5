$(document).ready(function(){
  $("#header").load("header.html");
  $("#footer").load("footer.html");

  const $header = $("header");
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

  // ================== Section2: Tab Menu ==================
  $(".season-tabmenu .btn li").click(function(){
    $(this).addClass("active").siblings().removeClass("active");

    let result = $(this).attr("data-alt");
    $(".tab-contents .tab").removeClass("active");
    $("#" + result).addClass("active");
  });

// ================== Section3: Tab Menu ==================
// Section3: Tab Menu
$(".menu-tab li").click(function(){
  $(this).addClass("active").siblings().removeClass("active");

  let result = $(this).attr("data-alt");
  $(".menu-contents .menu-list").removeClass("active");
  $("#" + result).addClass("active");
});

  // Section4: 인스타 슬라이드 무한 루프
  let cloneInsta = $(".insta-track").clone(true);  // 원본 트랙 복제
  $(cloneInsta).appendTo(".insta-slider");         // 복제본을 부모(.insta-slider)에 추가


 // Section5: 썸네일 클릭 시 상세 영역 변경 + active 효과
  $(".thumb").on("click", function () {
    const imgSrc = $(this).data("img");
    const infoHtml = $(this).data("info");

    // 썸네일 active 상태 관리
    $(".thumb").removeClass("active");
    $(this).addClass("active");

    // 이미지 변경
    if (imgSrc) {
      $("#detailImage").attr("src", imgSrc);
    } else {
      $("#detailImage").attr("src", "img/latte_d.png");
    }

    // 정보 변경
    if (infoHtml) {
      $("#detailInfo").html(infoHtml);
    } else {
      $("#detailInfo").html("<h3>메뉴 준비중</h3><p>곧 업데이트 됩니다 :)</p>");
    }
  });

  // 페이지 로드 시 첫 번째 썸네일 자동 클릭 처리
  if ($(".thumb").length > 0) {
    $(".thumb").first().trigger("click");
  }

});
