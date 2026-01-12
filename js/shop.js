$(function(){
  // Header / Footer 불러오기
  $("#header").load("header.html");
  $("#footer").load("footer.html");

  // ──────────────── 탭 전환 ────────────────
  function activateTab(id) {
    const $target = $("#" + id);
    $(".sub_tab li").removeClass("on");
    $(`.sub_tab a[data-target="${id}"]`).parent().addClass("on");

    $(".tab-content").removeClass("active").hide();
    $target.fadeIn(200).addClass("active");
  }

  $(".sub_tab a").on("click", function(e){
    e.preventDefault();
    const id = $(this).data("target");
    activateTab(id);
    history.replaceState(null, "", "#" + id);
  });

  const hash = (location.hash || "#coffee").replace("#", "");
  activateTab(hash);

  // ──────────────── 장바구니 사이드바 ────────────────
  const $cartSidebar = $("#cart-sidebar");
  const $cartItems = $(".cart-items");

  $("#open-cart").on("click", function(){
    $cartSidebar.addClass("open");
  });
  $("#close-cart").on("click", function(){
    $cartSidebar.removeClass("open");
  });

  // localStorage 핸들러
  function getCartData() {
    return JSON.parse(localStorage.getItem("fritzCart")) || [];
  }
  function saveCartData(data) {
    localStorage.setItem("fritzCart", JSON.stringify(data));
    renderCart();
  }

  // 장바구니 렌더링
  function renderCart(){
    let cart = getCartData();
    $cartItems.empty();
    if(cart.length === 0){
      $cartItems.html('<p class="empty">장바구니가 비어있습니다.</p>');
      $("#cart-total-info").text("총 0개 · ₩0");
      return;
    }

    let total = 0, totalCount = 0;
    cart.forEach(item => {
      let subtotal = item.price * item.qty;
      total += subtotal;
      totalCount += item.qty;

      $cartItems.append(`
        <div class="cart-item" data-name="${item.name}">
          <img src="${item.imgSrc}" alt="${item.name}">
          <div class="cart-item-info">
            <span class="name">${item.name}</span>
            <span class="price">₩${subtotal.toLocaleString()}</span>
            <div class="quantity-control">
              <button class="minus">-</button>
              <span>${item.qty}</span>
              <button class="plus">+</button>
            </div>
          </div>
          <button class="remove-item">삭제</button>
        </div>
      `);
    });

    $("#cart-total-info").text(`총 ${totalCount}개 · ₩${total.toLocaleString()}`);
  }

  // 페이지 로드 시 장바구니 렌더링
  renderCart();

  // ──────────────── 상품 장바구니 담기 ────────────────
  $(".sub_con").on("click", ".cart-btn", function(){
    const $card = $(this).closest(".product-card");
    const name = $card.find("h3").text();
    const price = parseInt($card.find(".price").text().replace(/[₩,]/g, ""));
    const imgSrc = $card.find("img").attr("src");

    let cart = getCartData();
    const existing = cart.find(item => item.name === name);
    if(existing){
      existing.qty += 1;
    } else {
      cart.push({name, price, imgSrc, qty:1});
    }
    saveCartData(cart);
  });

  // ──────────────── 수량 조절 ────────────────
  $cartItems.on("click", ".plus", function(){
    const name = $(this).closest(".cart-item").data("name");
    let cart = getCartData();
    const item = cart.find(i => i.name === name);
    item.qty++;
    saveCartData(cart);
  });

  $cartItems.on("click", ".minus", function(){
    const name = $(this).closest(".cart-item").data("name");
    let cart = getCartData();
    const item = cart.find(i => i.name === name);
    if(item.qty > 1) item.qty--;
    saveCartData(cart);
  });

  // ──────────────── 상품 삭제 ────────────────
  $cartItems.on("click", ".remove-item", function(){
    const name = $(this).closest(".cart-item").data("name");
    let cart = getCartData().filter(i => i.name !== name);
    saveCartData(cart);
  });

  // ──────────────── 결제하기 버튼 ────────────────
  $(".checkout-btn").on("click", function(){
    window.location.href = "shop_order.html";
  });

// 상품 이미지 hover시 변경
$(".product-card").hover(
  function () {
    const hoverSrc = $(this).data("hover");
    $(this).find("img").attr("src", hoverSrc);
  },
  function () {
    const originalSrc = $(this).data("img");
    $(this).find("img").attr("src", originalSrc);
  }
);

});

