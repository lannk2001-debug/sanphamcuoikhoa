let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.getElementById("cartList");

function renderCart(){
    cartList.innerHTML = "";
    let total = 0;

    if(cart.length === 0){
        cartList.innerHTML = "<p>Giỏ hàng trống 😢</p>";
        document.getElementById("totalPrice").innerText = "Tổng: 0đ";
        return;
    }

    cart.forEach((item, index)=>{
        total += item.price * item.quantity;

        cartList.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}">
            <div class="cart-info">
                <b>${item.name}</b>
                <span class="price">${item.price.toLocaleString()}đ</span>
            </div>

            <div class="qty-box">
                <button onclick="changeQty(${index},-1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${index},1)">+</button>
            </div>

            <button class="delete-btn" onclick="removeItem(${index})">X</button>
        </div>`;
    });

    document.getElementById("totalPrice").innerText =
        "Tổng: " + total.toLocaleString() + "đ";
}

function changeQty(index, amount){
    cart[index].quantity += amount;
    if(cart[index].quantity < 1){
        cart.splice(index,1);
    }
    saveCart();
}

function removeItem(index){
    cart.splice(index,1);
    saveCart();
}

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

renderCart();
const checkoutBtn = document.querySelector(".checkout");

checkoutBtn.addEventListener("click", () => {

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    // ❌ Thiếu thông tin
    if (!name || !phone || !address) {
        alert("❌ Bạn chưa điền đủ thông tin");
        return;
    }

    // ❌ Giỏ hàng trống
    if (cart.length === 0) {
        alert("❌ Chưa thêm gì vào giỏ hàng");
        return;
    }

    // ✅ OK
    alert("✅ Thanh toán thành công 🎉");

    cart = [];
    localStorage.removeItem("cart");
    renderCart();
});

