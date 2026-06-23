import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ================= FIREBASE ================= */
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

/* ================= GET ID ================= */
const productId = new URLSearchParams(window.location.search).get("id");

if (!productId) {
  alert("Không tìm thấy sản phẩm");
  window.location.href = "trang-do-an.html";
}

/* ================= LOAD PRODUCT ================= */
async function loadProduct() {
  try {
    const docRef = doc(db, "products-do-an", productId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      alert("Sản phẩm không tồn tại");
      window.location.href = "trang-do-an.html";
      return;
    }

    const product = docSnap.data();

    document.getElementById("productImage").src = product.image;
    document.getElementById("productName").innerText = product.name;
    document.getElementById("productPrice").innerText =
      "Giá: " + Number(product.price).toLocaleString() + " vnđ";

  } catch (err) {
    console.error(err);
    alert("Lỗi tải sản phẩm");
  }
}

loadProduct();

/* ================= BUY NOW ================= */
document.getElementById("buyNowBtn").addEventListener("click", () => {
  const name = document.getElementById("productName").innerText;
  const price = Number(
    document.getElementById("productPrice").innerText.replace(/[^\d]/g, "")
  );
  const quantity = Number(document.getElementById("quantity").value);

  localStorage.setItem(
    "buyNow",
    JSON.stringify({
      productId,
      name,
      price,
      quantity
    })
  );

  window.location.href = "mua-ngay.html";
});

/* ================= ADD TO CART (FIXED LIKE TRANG CHỦ) ================= */
const addBtn = document.getElementById("addToCartBtn");

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  addBtn.addEventListener("click", async () => {

    const name = document.getElementById("productName").innerText;

    const price = Number(
      document.getElementById("productPrice").innerText.replace(/[^\d]/g, "")
    );

    const quantity = Number(document.getElementById("quantity").value);
    const image = document.getElementById("productImage").src;

    const cartRef = doc(db, "cart", user.uid);
    const cartSnap = await getDoc(cartRef);

    let items = [];

    if (cartSnap.exists()) {
      items = cartSnap.data().items || [];
    }

    const index = items.findIndex(
      (item) => item.productId === productId
    );

    if (index >= 0) {
      items[index].quantity += quantity;
    } else {
      items.push({
        productId,
        name,
        image,
        price,
        quantity
      });
    }

    await setDoc(cartRef, {
      userId: user.uid,
      items
    });

    alert("Đã thêm vào giỏ hàng!");
  });
});