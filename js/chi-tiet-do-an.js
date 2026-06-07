const product =
  JSON.parse(localStorage.getItem("foodDetail"));

if (!product) {
  alert("Không tìm thấy sản phẩm");
  window.location.href = "trang-do-an.html";
}

document.getElementById("productImage").src =
  product.image;

document.getElementById("productName").innerText =
  product.name;

document.getElementById("productPrice").innerText =
  "Giá: " +
  Number(product.price).toLocaleString() +
  " vnđ";
  document.getElementById("buyNowBtn")
  .addEventListener("click", () => {
  
      const quantity =
          parseInt(document.getElementById("quantity").value) || 1;
  
      const order = {
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity
      };
  
      localStorage.setItem(
          "buyNow",
          JSON.stringify(order)
      );
  
      window.location.href = "mua-ngay.html";
  });
  