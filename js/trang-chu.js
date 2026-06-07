import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDT3sHqd9lw5uJu32ah9qFh4CbRxR2ywJM",
  authDomain: "spck-a05c0.firebaseapp.com",
  projectId: "spck-a05c0",
  storageBucket: "spck-a05c0.firebasestorage.app",
  messagingSenderId: "434707378098",
  appId: "1:434707378098:web:d5847d1944f955d2d97eab",
  measurementId: "G-GD1EK3PMZ2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const foodContainer = document.getElementById("foodContainer");

async function loadProducts() {

  try {

    const querySnapshot = await getDocs(collection(db, "products"));

    foodContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {

      const product = doc.data();

      foodContainer.innerHTML += `
      
        <div class="food-item">

          <img src="${product.image}" alt="${product.name}">

          <h3>${product.name}</h3>

          <p>Giá: ${product.price.toLocaleString()} vnđ</p>

          <button class="submit">
            <a href="chitiet.html?id=${doc.id}">
              Chi tiết
            </a>
          </button>

          <button class="cart">
            Thêm vào giỏ hàng
          </button>

        </div>

      `;
    });

  } catch (error) {

    console.error("Lỗi tải sản phẩm:", error);

    foodContainer.innerHTML = `
      <p style="color:red">
        Không tải được dữ liệu từ Firebase
      </p>
    `;
  }
}

loadProducts();

window.toggleMenu = function () {

  const menu = document.getElementById("popularMenu");

  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
};


