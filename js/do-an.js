import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmJrdkAeuQVTE_t26I3bmZvRC5bySCw9s",
  authDomain: "bandoancuoikhoa.firebaseapp.com",
  projectId: "bandoancuoikhoa",
  storageBucket: "bandoancuoikhoa.firebasestorage.app",
  messagingSenderId: "872296176105",
  appId: "1:872296176105:web:1d3d26e139244977ecd378",
  measurementId: "G-056SSRX3CV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const foodContainer = document.getElementById("foodContainer");

async function loadFood() {

  const querySnapshot =
    await getDocs(collection(db, "food"));

  foodContainer.innerHTML = "";

  querySnapshot.forEach((doc) => {

    const product = doc.data();

    foodContainer.innerHTML += `
      <div class="food-item">

        <img src="${product.image}" alt="${product.name}">

        <h3>${product.name}</h3>

        <p>
          Giá:
          ${Number(product.price).toLocaleString()} vnđ
        </p>

        <button class="submit"
          onclick='showDetail(${JSON.stringify(product)})'>
          Chi tiết
        </button>

        <button class="cart">
          Thêm vào giỏ hàng
        </button>

      </div>
    `;
  });
}

loadFood();

window.showDetail = function(product) {

  localStorage.setItem(
    "foodDetail",
    JSON.stringify(product)
  );

  window.location.href = "chitiet-doan.html";
};

window.toggleMenu = function () {

  const menu =
    document.getElementById("popularMenu");

  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
};

