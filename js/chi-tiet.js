import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

const addBtn = document.getElementById("addToCartBtn");

addBtn.addEventListener("click", async () => {
  const user = auth.currentUser;

  if (!user) {
    alert("Vui lòng đăng nhập");
    return;
  }

  const productId = new URLSearchParams(window.location.search).get("id");

  const name = document.getElementById("productName").innerText;

  const price = Number(
    document.getElementById("productPrice")
      .innerText
      .replace(/\D/g, "")
  );

  const quantity = Number(
    document.getElementById("quantity").value
  );

  const image = document.getElementById("productImage").src;

  const cartRef = doc(db, "cart", user.uid);
  const cartSnap = await getDoc(cartRef);

  let items = [];

  if (cartSnap.exists()) {
    items = cartSnap.data().items || [];
  }

  const index = items.findIndex(
    item => item.productId === productId
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