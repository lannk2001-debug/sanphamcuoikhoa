let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = -1;

function display(){
    let html="";
    products.forEach((p,index)=>{
        html+=`
        <tr>
            <td>${p.name}</td>
            <td>${Number(p.price).toLocaleString()}đ</td>
            <td><img src="${p.image}"></td>
            <td>
                <button onclick="edit(${index})">Sửa</button>
                <button onclick="del(${index})" style="background:red">Xóa</button>
            </td>
        </tr>
        `;
    });
    document.getElementById("list").innerHTML=html;
}

function saveProduct(){
    let name=document.getElementById("name").value;
    let price=document.getElementById("price").value;
    let image=document.getElementById("image").value;

    if(!name||!price||!image){
        alert("Nhập đủ thông tin");
        return;
    }

    if(editIndex===-1){
        products.push({name,price,image});
    }else{
        products[editIndex]={name,price,image};
        editIndex=-1;
    }

    localStorage.setItem("products",JSON.stringify(products));

    document.getElementById("name").value="";
    document.getElementById("price").value="";
    document.getElementById("image").value="";

    display();
}

function edit(i){
    document.getElementById("name").value=products[i].name;
    document.getElementById("price").value=products[i].price;
    document.getElementById("image").value=products[i].image;
    editIndex=i;
}

function del(i){
    products.splice(i,1);
    localStorage.setItem("products",JSON.stringify(products));
    display();
}

display();