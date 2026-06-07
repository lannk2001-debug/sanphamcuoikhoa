import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUOEZxjaICLvxc8X2th8vjQh_VC3enWdA",
  authDomain: "bandouong-77e42.firebaseapp.com",
  projectId: "bandouong-77e42",
  storageBucket: "bandouong-77e42.firebasestorage.app",
  messagingSenderId: "95549752649",
  appId: "1:95549752649:web:6f2cfdb21b291bbe770698",
  measurementId: "G-4S7P81N2MK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const id =
  new URLSearchParams(window.location.search)
    .get("id");

if (!id) {
  alert("Không tìm thấy sản phẩm");
}

const docRef = doc(db, "drink", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {

  const product = docSnap.data();

  document.getElementById("productImage").src =
    product.image;

  document.getElementById("productName").innerText =
    product.name;

  document.getElementById("productPrice").innerText =
    "Giá: " +
    Number(product.price).toLocaleString() +
    " vnđ";

  // Thêm giỏ hàng
  document
    .getElementById("addToCartBtn")
    .addEventListener("click", () => {

      const quantity =
        Number(
          document.getElementById("quantity").value
        );

      let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      cart.push({
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      alert("✅ Đã thêm vào giỏ hàng");
    });

  // Mua ngay
  document
    .getElementById("buyNowBtn")
    .addEventListener("click", () => {

      const quantity =
        Number(
          document.getElementById("quantity").value
        );

      const buyNow = {
        name: product.name,
        price: product.price,
        quantity: quantity
      };

      localStorage.setItem(
        "buyNow",
        JSON.stringify(buyNow)
      );

      window.location.href =
        "mua-ngay.html";
    });

} else {

  alert("Không tìm thấy sản phẩm");

}