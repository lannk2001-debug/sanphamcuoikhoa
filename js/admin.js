import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const list =
document.getElementById("list");

let editId = null;

async function loadProducts() {

  const snapshot =
    await getDocs(
      collection(db, "products")
    );

  list.innerHTML = "";

  snapshot.forEach((item) => {

    const data = item.data();

    list.innerHTML += `

      <tr>

        <td>${data.name}</td>

        <td>
          ${data.price.toLocaleString()} đ
        </td>

        <td>
          <img src="${data.image}">
        </td>

        <td>

          <button
          onclick="editProduct('${item.id}')">
            Sửa
          </button>

          <button
          onclick="removeProduct('${item.id}')">
            Xóa
          </button>

        </td>

      </tr>

    `;
  });

}

loadProducts();

window.saveProduct =
async function () {

  const name =
    document.getElementById("name").value;

  const price =
    Number(
      document.getElementById("price").value
    );

  const image =
    document.getElementById("image").value;

  if (!name || !price || !image) {

    alert("Nhập đầy đủ thông tin");

    return;

  }

  if (editId) {

    await updateDoc(
      doc(db, "products", editId),
      {
        name,
        price,
        image
      }
    );

    alert("Cập nhật thành công");

    editId = null;

  } else {

    await addDoc(
      collection(db, "products"),
      {
        name,
        price,
        image
      }
    );

    alert("Thêm sản phẩm thành công");

  }

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";

  loadProducts();

};

window.editProduct =
async function (id) {

  const productRef =
    doc(db, "products", id);

  const productSnap =
    await getDoc(productRef);

  if (!productSnap.exists())
    return;

  const data =
    productSnap.data();

  document.getElementById("name").value =
    data.name;

  document.getElementById("price").value =
    data.price;

  document.getElementById("image").value =
    data.image;

  editId = id;

};

window.removeProduct =
async function (id) {

  const check =
    confirm(
      "Bạn có chắc muốn xóa sản phẩm này?"
    );

  if (!check)
    return;

  await deleteDoc(
    doc(db, "products", id)
  );

  alert("Đã xóa sản phẩm");

  loadProducts();

};