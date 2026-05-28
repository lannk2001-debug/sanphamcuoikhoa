
// ===== IMPORT FIREBASE =====
import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

// ===== KHỞI TẠO FIREBASE =====
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===== FOOD CONTAINER =====
const foodContainer =
document.getElementById("foodContainer");

// ===== LOAD SẢN PHẨM =====
async function loadFoods() {

  foodContainer.innerHTML = "";

  const querySnapshot =
  await getDocs(collection(db, "sanpham"));

  querySnapshot.forEach((doc) => {

    const item = doc.data();

    foodContainer.innerHTML += `

      <div class="food-item">

        <img src="${item.anh}" alt="">

        <h3>${item.ten}</h3>

        <p>
          Giá: ${item.gia.toLocaleString()} vnđ
        </p>

        <button class="submit">

          <a href="${item.chitiet}">
            Chi tiết
          </a>

        </button>

        <button class="cart"

          onclick="
            addToCart(
              '${item.ten}',
              ${item.gia},
              '${item.anh}'
            )
          "

        >

          Thêm vào giỏ hàng

        </button>

      </div>

    `;

  });

}

// ===== THÊM GIỎ HÀNG =====
window.addToCart = async function (
  ten,
  gia,
  anh
) {

  try {

    await addDoc(
      collection(db, "giohang"),
      {

        ten: ten,
        gia: gia,
        anh: anh,
        soLuong: 1

      }
    );

    alert("Đã thêm vào giỏ hàng!");

  } catch (error) {

    console.log(error);

    alert("Lỗi thêm sản phẩm!");

  }

};

// ===== DROPDOWN =====
window.toggleMenu = function () {

  const menu =
  document.getElementById("popularMenu");

  if (menu.style.display === "block") {

    menu.style.display = "none";

  } else {

    menu.style.display = "block";

  }

};

// ===== SEARCH =====
const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener(
  "keyup",
  function () {

    const keyword =
    searchInput.value.toLowerCase();

    const items =
    document.querySelectorAll(".food-item");

    items.forEach(item => {

      const foodName =
      item.querySelector("h3")
      .innerText
      .toLowerCase();

      if (
        foodName.includes(keyword)
      ) {

        item.style.display = "block";

      } else {

        item.style.display = "none";

      }

    });

  }
);

// ===== CHẠY =====
loadFoods();