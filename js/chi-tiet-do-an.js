import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc
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

async function loadProduct() {

  const productId =
    new URLSearchParams(
      window.location.search
    ).get("id");

  if (!productId) {

    alert("Không tìm thấy sản phẩm");

    window.location.href =
      "trang-do-an.html";

    return;

  }

  try {

    const productRef =
      doc(
        db,
        "products-do-an",
        productId
      );

    const productSnap =
      await getDoc(productRef);

    if (!productSnap.exists()) {

      alert("Sản phẩm không tồn tại");

      window.location.href =
        "trang-do-an.html";

      return;

    }

    const product =
      productSnap.data();

    document.getElementById(
      "productImage"
    ).src =
      product.image;

    document.getElementById(
      "productName"
    ).innerText =
      product.name;

    document.getElementById(
      "productPrice"
    ).innerText =
      "Giá: " +
      Number(product.price)
      .toLocaleString() +
      " vnđ";

    document
      .getElementById("buyNowBtn")
      .addEventListener(
        "click",
        () => {

          const quantity =
            parseInt(
              document.getElementById(
                "quantity"
              ).value
            ) || 1;

          localStorage.setItem(
            "buyNow",
            JSON.stringify({
              productId:
                productId,
              name:
                product.name,
              image:
                product.image,
              price:
                product.price,
              quantity:
                quantity
            })
          );

          window.location.href =
            "mua-ngay.html";

        }
      );

  } catch (error) {

    console.error(error);

    alert(
      "Lỗi tải sản phẩm"
    );

  }

}

loadProduct();
  