const addBtn = document.getElementById("addToCartBtn");
const buyNowBtn = document.getElementById("buyNowBtn");

// THÊM VÀO GIỎ
addBtn.addEventListener("click", () => {

    const name = document.querySelector(".product-title").innerText;
    const priceText = document.querySelector(".product-price").innerText;
    const price = parseInt(priceText.replace(/\D/g, ""));
    const quantity = parseInt(document.getElementById("quantity").value);
    const image = document.querySelector(".product-image img").src;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        cart[index].quantity += quantity;
    } else {
        cart.push({ name, price, quantity, image });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Đã thêm vào giỏ hàng!");
});

// MUA NGAY
buyNowBtn.addEventListener("click", () => {
    alert("✅ Mua thành công 🎉");
});