import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

const auth = getAuth(app);

const foodContainer =
document.getElementById("foodContainer");

const searchInput =
document.getElementById("searchInput");

let allProducts = [];

function renderProducts(products) {

  foodContainer.innerHTML = "";

  if (products.length === 0) {

    foodContainer.innerHTML = `
      <p>Không tìm thấy sản phẩm</p>
    `;

    return;

  }

  products.forEach((product) => {

    foodContainer.innerHTML += `

      <div class="food-item">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <h3>
          ${product.name}
        </h3>

        <p>
          Giá:
          ${Number(product.price).toLocaleString()}
          vnđ
        </p>

        <button class="submit">

          <a href="chitiet.html?id=${product.id}">
            Chi tiết
          </a>

        </button>

        <button
          class="cart"
          data-id="${product.id}"
          data-name="${product.name}"
          data-price="${product.price}"
          data-image="${product.image}"
        >

          Thêm vào giỏ hàng

        </button>

      </div>

    `;

  });

}

async function loadProducts() {

  try {

    const querySnapshot =
      await getDocs(
        collection(db, "products")
      );

    allProducts = [];

    querySnapshot.forEach((docSnap) => {

      allProducts.push({

        id:
          docSnap.id,

        ...docSnap.data()

      });

    });

    renderProducts(allProducts);

  } catch (error) {

    console.error(
      "Lỗi tải sản phẩm:",
      error
    );

    foodContainer.innerHTML = `
      <p style="color:red">
        Không tải được dữ liệu từ Firebase
      </p>
    `;

  }

}

loadProducts();

searchInput.addEventListener(
  "input",
  (e) => {

    const keyword =
      e.target.value
      .toLowerCase()
      .trim();

    const filtered =
      allProducts.filter(
        product =>
          product.name
          .toLowerCase()
          .includes(keyword)
      );

    renderProducts(filtered);

  }
);

window.toggleMenu = function () {

  const menu =
    document.getElementById("popularMenu");

  if (menu.style.display === "block") {

    menu.style.display = "none";

  } else {

    menu.style.display = "block";

  }

};

document.addEventListener(
  "click",
  async (e) => {

    if (
      !e.target.classList.contains("cart")
    )
      return;

    const user =
      auth.currentUser;

    if (!user) {

      alert("Vui lòng đăng nhập");

      return;

    }

    const btn =
      e.target;

    const cartRef =
      doc(db, "cart", user.uid);

    const cartSnap =
      await getDoc(cartRef);

    let items = [];

    if (cartSnap.exists()) {

      items =
        cartSnap.data().items || [];

    }

    const index =
      items.findIndex(
        item =>
          item.productId ===
          btn.dataset.id
      );

    if (index >= 0) {

      items[index].quantity++;

    } else {

      items.push({

        productId:
          btn.dataset.id,

        name:
          btn.dataset.name,

        image:
          btn.dataset.image,

        price:
          Number(btn.dataset.price),

        quantity:
          1

      });

    }

    await setDoc(
      cartRef,
      {

        userId:
          user.uid,

        items:
          items

      }
    );

    alert(
      "Đã thêm vào giỏ hàng!"
    );

  }
);
