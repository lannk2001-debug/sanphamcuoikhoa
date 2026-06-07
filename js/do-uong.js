import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
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

const drinkContainer =
  document.getElementById("drinkContainer");

async function loadDrink() {

  const querySnapshot =
    await getDocs(collection(db, "drink"));

  drinkContainer.innerHTML = "";

  querySnapshot.forEach((doc) => {

    const product = doc.data();

    drinkContainer.innerHTML += `
      <div class="food-item">

        <img src="${product.image}" alt="${product.name}">

        <h3>${product.name}</h3>

        <p>
          Giá:
          ${Number(product.price).toLocaleString()} vnđ
        </p>

        <button class="submit">
          <a href="chitiet-douong.html?id=${doc.id}">
            Chi tiết
          </a>
        </button>

        <button
          class="cart"
          onclick="addToCart(
            '${product.name}',
            ${product.price},
            '${product.image}'
          )">
          Thêm vào giỏ hàng
        </button>

      </div>
    `;
  });
}

loadDrink();

window.toggleMenu = function () {

  const menu =
    document.getElementById("popularMenu");

  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
};

// Thêm giỏ hàng
window.addToCart = function(name, price, image) {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name,
    price,
    image,
    quantity: 1
  });

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  alert("✅ Đã thêm vào giỏ hàng");
};