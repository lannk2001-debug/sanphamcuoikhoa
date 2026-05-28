// ===== IMPORT FIREBASE =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ===== FIREBASE CONFIG =====
const firebaseConfig = {
  apiKey: "AIzaSyDsBxhiHjaPd0e7P_CexFue91IHFW__FKs",
  authDomain: "sanphamcuoikhoabanhang.firebaseapp.com",
  projectId: "sanphamcuoikhoabanhang",
  storageBucket: "sanphamcuoikhoabanhang.firebasestorage.app",
  messagingSenderId: "112637067003",
  appId: "1:112637067003:web:879e801a459041721eba5e",
  measurementId: "G-T11WF14LFP"
};

// ===== KHỞI TẠO =====
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const cartList = document.getElementById("cartList");
const totalPrice = document.getElementById("totalPrice");

// ===== LOAD GIỎ HÀNG =====
async function loadCart() {

  cartList.innerHTML = "";

  let total = 0;

  const querySnapshot = await getDocs(collection(db, "giohang"));

  querySnapshot.forEach((documentData) => {

    const item = documentData.data();
    const docId = documentData.id;

    total += item.gia * item.soLuong;

    cartList.innerHTML += `
    
      <div class="cart-item">

        <img src="${item.anh}" alt="">

        <div class="cart-info">
          <b>${item.ten}</b>
          <div class="price">
            ${item.gia.toLocaleString()}đ
          </div>
        </div>

        <div class="qty-box">

          <button onclick="decreaseQty('${docId}', ${item.soLuong})">
            -
          </button>

          <span>${item.soLuong}</span>

          <button onclick="increaseQty('${docId}', ${item.soLuong})">
            +
          </button>

        </div>

        <button class="delete-btn"
          onclick="deleteItem('${docId}')">
          Xóa
        </button>

      </div>

    `;

  });

  totalPrice.innerHTML =
    `Tổng: ${total.toLocaleString()}đ`;

}

// ===== TĂNG SỐ LƯỢNG =====
window.increaseQty = async function (id, currentQty) {

  const itemRef = doc(db, "giohang", id);

  await updateDoc(itemRef, {
    soLuong: currentQty + 1
  });

  loadCart();

};

// ===== GIẢM SỐ LƯỢNG =====
window.decreaseQty = async function (id, currentQty) {

  if (currentQty <= 1) return;

  const itemRef = doc(db, "giohang", id);

  await updateDoc(itemRef, {
    soLuong: currentQty - 1
  });

  loadCart();

};

// ===== XÓA =====
window.deleteItem = async function (id) {

  await deleteDoc(doc(db, "giohang", id));

  loadCart();

};

// ===== THANH TOÁN =====
const checkoutBtn = document.querySelector(".checkout");

checkoutBtn.addEventListener("click", async function () {

  const name =
    document.getElementById("customerName").value;

  const phone =
    document.getElementById("customerPhone").value;

  const address =
    document.getElementById("customerAddress").value;

  if (!name || !phone || !address) {

    alert("Vui lòng nhập đầy đủ thông tin!");
    return;

  }

  alert("Thanh toán thành công!");

});

// ===== LOAD KHI MỞ TRANG =====
loadCart();

