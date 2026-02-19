function toggleMenu() {
    const menu = document.getElementById("popularMenu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
  }

(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="sMhcNocsS5DzDHnC3u7hU";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();

function addToCart(name, price, image){

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const index = cart.findIndex(item => item.name === name);

  if(index !== -1){
      cart[index].quantity += 1;   // 👈 giống trang chi tiết
  } else {
      cart.push({
          name: name,
          price: price,
          quantity: 1,            // 👈 dùng quantity, không dùng qty
          image: image
      });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("✅ Đã thêm vào giỏ hàng!");
}