
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRR1bIBvDAimHGzY-qGblRcJJDcwzRyvo",
  authDomain: "giohangcuoikhoa.firebaseapp.com",
  projectId: "giohangcuoikhoa",
  storageBucket: "giohangcuoikhoa.firebasestorage.app",
  messagingSenderId: "639316856880",
  appId: "1:639316856880:web:7b11403bc030e9374f5df5",
  measurementId: "G-451BE9KTTE"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const cartList = document.getElementById("cartList");
const totalPrice = document.getElementById("totalPrice");

async function loadCart() {

  cartList.innerHTML = "";

  let total = 0;

  const querySnapshot = await getDocs(collection(db, "cart"));

  querySnapshot.forEach((docSnap) => {

    const item = docSnap.data();

    total += item.price;

    cartList.innerHTML += `

      <div class="cart-item">

        <img src="${item.image}">

        <div class="cart-info">
          <b>${item.name}</b>
          <div class="price">
            ${item.price.toLocaleString()}đ
          </div>
        </div>

        <button class="delete-btn"
          onclick="deleteItem('${docSnap.id}')">
          Xóa
        </button>

      </div>

    `;
  });

  totalPrice.innerHTML =
    "Tổng: " + total.toLocaleString() + "đ";
}

loadCart();

window.deleteItem = async function(id) {

  await deleteDoc(doc(db, "cart", id));

  loadCart();
}

document.querySelector(".checkout")
.addEventListener("click", async () => {

  const name =
    document.getElementById("customerName").value;

  const phone =
    document.getElementById("customerPhone").value;

  const address =
    document.getElementById("customerAddress").value;

  if (!name || !phone || !address) {

    alert("Bạn chưa điền đầy đủ thông tin!");

    return;
  }

  alert("Đặt hàng thành công!");
});


