const firebaseConfig = {
  apiKey: "AIzaSyD9SF44yxBlQNGFgd3VqgsTU0VsI5ECKSg",
  authDomain: "jsb34-bf231.firebaseapp.com",
  projectId: "jsb34-bf231",
  storageBucket: "jsb34-bf231.firebasestorage.app",
  messagingSenderId: "654336205328",
  appId: "1:654336205328:web:0a931178ff842f247d6095",
  measurementId: "G-HV7NZGHRRW"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

/////////////////////////
// REGISTER
/////////////////////////
function register() {
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;

  if (!email || !password || !confirm) {
    alert("Vui lòng nhập đầy đủ thông tin ☕");
    return;
  }

  if (password !== confirm) {
    alert("Mật khẩu không khớp!");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Đăng ký thành công ☕");
      window.location.href = "login.html";
    })
    .catch(err => alert(err.message));
}

/////////////////////////
// LOGIN
/////////////////////////
function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Đăng nhập thành công ☕");
      window.location.href = "trang-chu.html";
    })
    .catch(err => alert("Sai email hoặc mật khẩu!"));
}

/////////////////////////
// CHECK LOGIN
/////////////////////////
auth.onAuthStateChanged(user => {
  if (!user) {
    if (window.location.pathname.includes("home.html")) {
      window.location.href = "login.html";
    }
  }
});

/////////////////////////
// LOGOUT
/////////////////////////
function logout() {
  auth.signOut().then(() => {
    alert("Đã đăng xuất!");
    window.location.href = "login.html";
  });
}


  