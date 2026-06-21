import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  addDoc,
  collection
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
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

const cartList =
document.getElementById("cartList");

const totalPrice =
document.getElementById("totalPrice");

async function loadCart() {

  const user =
    auth.currentUser;

  if (!user)
    return;

  const cartRef =
    doc(db, "cart", user.uid);

  const cartSnap =
    await getDoc(cartRef);

  cartList.innerHTML = "";

  let total = 0;

  if (!cartSnap.exists()) {

    totalPrice.innerHTML =
      "Tổng: 0đ";

    return;

  }

  const items =
    cartSnap.data().items || [];

  items.forEach((item, index) => {

    total +=
      item.price * item.quantity;

    cartList.innerHTML += `

      <div class="cart-item">

        <img src="${item.image}">

        <div class="cart-info">

          <b>${item.name}</b>

          <div class="price">
            ${item.price.toLocaleString()}đ
          </div>

        </div>

        <div class="qty-box">

          <button
          onclick="minusQty(${index})">
            -
          </button>

          <span>
            ${item.quantity}
          </span>

          <button
          onclick="plusQty(${index})">
            +
          </button>

        </div>

        <button
        class="delete-btn"
        onclick="removeItem(${index})">
          Xóa
        </button>

      </div>

    `;

  });

  totalPrice.innerHTML =
    `Tổng: ${total.toLocaleString()}đ`;

}

window.plusQty = async (index) => {

  const user =
    auth.currentUser;

  const cartRef =
    doc(db, "cart", user.uid);

  const cartSnap =
    await getDoc(cartRef);

  const items =
    cartSnap.data().items;

  items[index].quantity++;

  await setDoc(
    cartRef,
    {
      userId: user.uid,
      items: items
    }
  );

  loadCart();

};

window.minusQty = async (index) => {

  const user =
    auth.currentUser;

  const cartRef =
    doc(db, "cart", user.uid);

  const cartSnap =
    await getDoc(cartRef);

  const items =
    cartSnap.data().items;

  if (items[index].quantity <= 1)
    return;

  items[index].quantity--;

  await setDoc(
    cartRef,
    {
      userId: user.uid,
      items: items
    }
  );

  loadCart();

};

window.removeItem = async (index) => {

  const user =
    auth.currentUser;

  const cartRef =
    doc(db, "cart", user.uid);

  const cartSnap =
    await getDoc(cartRef);

  const items =
    cartSnap.data().items;

  items.splice(index, 1);

  if (items.length === 0) {

    await deleteDoc(cartRef);

  } else {

    await setDoc(
      cartRef,
      {
        userId: user.uid,
        items: items
      }
    );

  }

  loadCart();

};

const checkoutBtn =
document.querySelector(".checkout");

checkoutBtn.addEventListener(
  "click",
  async () => {

    const user =
      auth.currentUser;

    if (!user) {

      alert("Vui lòng đăng nhập");

      return;

    }

    const name =
      document.getElementById("customerName").value;

    const phone =
      document.getElementById("customerPhone").value;

    const address =
      document.getElementById("customerAddress").value;

    if (!name || !phone || !address) {

      alert("Vui lòng nhập đầy đủ thông tin");

      return;

    }

    const cartRef =
      doc(db, "cart", user.uid);

    const cartSnap =
      await getDoc(cartRef);

    if (!cartSnap.exists()) {

      alert("Giỏ hàng trống");

      return;

    }

    const items =
      cartSnap.data().items || [];

    let total = 0;

    items.forEach((item) => {

      total +=
        item.price * item.quantity;

    });

    await addDoc(
      collection(db, "orders"),
      {

        userId:
          user.uid,

        customerName:
          name,

        customerPhone:
          phone,

        customerAddress:
          address,

        total:
          total,

        status:
          "pending",

        createdAt:
          new Date(),

        items:
          items

      }
    );

    await deleteDoc(
      cartRef
    );
    
    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("customerAddress").value = "";
    
    alert(
      "Đặt hàng thành công!"
    );
    
    loadCart();

  }
);

onAuthStateChanged(auth, (user) => {

  if (user) {

    loadCart();

  }

});
