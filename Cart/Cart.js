// document.addEventListener("DOMContentLoaded",()=>{
//     displayCart()
// })
// function displayCart(){
//     let cart=JSON.parse(localStorage.getItem("cart")) || [];
//     let cartContent=document.getElementById("cartContent");
//     let totalPrice=document.getElementById("totalPrice");
//     let totalBill=0;
    

//     if(cart.length===0){
//         cartContent.innerHTML=`<div id="empty"><p id="para">Your cart is Empty, So Start Shopping.......</p>
//         <button id="btn" onclick=window.location.href="../../Home.html">Start Shopping</button></div>`
//         totalPrice.innerHTML="Total Price: &#8377 0"
//     }
//     cart.map((product,i)=>{
//         totalBill +=Math.floor((product.price)*92);
//         let newProd=document.createElement("div");
//        newProd.setAttribute("class","prod-info")
//        newProd.innerHTML=`
//        <div id="img">
//            <img src="${product.thumbnail}"/>
//        </div>
//        <div id="itemDetails">
//           <h3><i>Tittle : </i>${product.title}</h3>
//           <p><strong>Category</strong>: ${product.category}</p>
//           <p>${product.description}</p>
//           <h2 id="price"><i>Price</i> &#8377 ${Math.floor((product.price)*92)}</h2>
//        </div>
//        <button onclick="removeFromCart(${i})">Remove</button>
//        `;
//        cartContent.append(newProd);
//        totalPrice.innerHTML=`<h1> TotalBill : &#8377 ${totalBill}</h1>`
//        console.log(totalBill);
//     })
    
// }

// function removeFromCart(index){
//     let cart=JSON.parse(localStorage.getItem("cart"));
//     cart.splice(index,1);
//     localStorage.setItem("cart",JSON.stringify(cart));
//     window.location.reload()
    
// }










//!--------------------------                     New One                         --------------------------------


// 🔁 Currency Conversion Constant (Easy to maintain)
const EXCHANGE_RATE = 83;

// Load cart when page loads
document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});

function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContent = document.getElementById("cartContent");
    let totalPrice = document.getElementById("totalPrice");

    cartContent.innerHTML = "";
    totalPrice.innerHTML = "";

    // If cart is empty
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <p>Your cart is empty. Start shopping now!</p>
        `;
        totalPrice.innerHTML = `<h2>Total: ₹ 0</h2>`;
        return;
    }

    let totalBill = 0;

    cart.forEach((product, index) => {
        let convertedPrice = Math.floor(product.price * EXCHANGE_RATE);
        totalBill += convertedPrice;

        let productCard = document.createElement("div");
        productCard.classList.add("prod-info");

        productCard.innerHTML = `
            <div id="img">
                <img src="${product.thumbnail}" alt="${product.title}">
            </div>

            <div id="itemDetails">
                <h3>${product.title}</h3>
                <p><strong>Category:</strong> ${product.category}</p>
                <p>${product.description}</p>
                <h4 id="price">₹ ${convertedPrice}</h4>
            </div>

            <button onclick="removeFromCart(${index})">
                Remove
            </button>
        `;

        cartContent.appendChild(productCard);
    });

    totalPrice.innerHTML = `
        <h2>Total Bill: ₹ ${totalBill}</h2>
    `;
}

// Remove product from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart(); // Refresh without reloading page
}