// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD9SF44yxBlQNGFgd3VqgsTU0VsI5ECKSg",
  authDomain: "jsb34-bf231.firebaseapp.com",
  projectId: "jsb34-bf231",
  storageBucket: "jsb34-bf231.firebasestorage.app",
  messagingSenderId: "654336205328",
  appId: "1:654336205328:web:0a931178ff842f247d6095",
  measurementId: "G-HV7NZGHRRW"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Authentication
const auth = getAuth(app);

// Khởi tạo Firestore Database
const db = getFirestore(app);

// Export để dùng file khác
export { auth, db };