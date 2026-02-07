const order = JSON.parse(localStorage.getItem("buyNow"));

if (!order) {
    alert("❌ Không có sản phẩm để mua");
    window.location.href = "trang-chu.html";
}

// Hiển thị thông tin
document.getElementById("productName").innerText =
    "Sản phẩm: " + order.name;

document.getElementById("productQty").innerText =
    "Số lượng: " + order.quantity;

document.getElementById("productTotal").innerText =
    "Tổng tiền: " + (order.price * order.quantity).toLocaleString() + "đ";

// Mua ngay
document.getElementById("confirmBuy").addEventListener("click", () => {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    if (!name || !phone || !address) {
        alert("❌ Vui lòng nhập đầy đủ thông tin");
        return;
    }

    alert("✅ Mua hàng thành công 🎉");

    localStorage.removeItem("buyNow");
    window.location.href = "trang-chu.html";
});