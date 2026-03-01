document.addEventListener("DOMContentLoaded", ()=>{
    let productDetails=document.getElementById("productDetails");
    let allproducts=JSON.parse(localStorage.getItem("allproducts"))
    let productId=localStorage.getItem("productId")

    if(allproducts && productId){
        let selectedProduct=allproducts.find((v)=>{
            return v.id==productId
        })
        if(selectedProduct){
            let price=Math.floor(selectedProduct.price)*92;
            let reviewsHTML="";
            selectedProduct.reviews.forEach(review => {
                reviewsHTML +=`
                <div class="review">
                     <div id="ratings">${"❤️".repeat(review.rating)}${"🖤".repeat(5-review.rating)}</div>
                     <p id="comment">${review.comment}</p>
                     <p id="name">By <strong>${review.reviewerName}</strong> on ${new Date(review.date)}</p>
                     <hr/>
                </div>
                `
            });
            productDetails.innerHTML=`
            <div id="productDetaling">
            <main id="first">
            <div id="image">
               <img src="${selectedProduct.thumbnail}"/>
            </div>
            <div id="details">
               <h1>${selectedProduct.title}</h1>
                <h4 class="space"><strong>Brand:</strong>${selectedProduct.brand}</h4>
                <h4 class="space"><strong>Category:</strong>${selectedProduct.category}</h4>
                <p class="space"><strong>Description:</strong>${selectedProduct.description}</p>
                <h4 class="space price"><strong>Price:</strong> &#8377 ${price}</h4>
                <button id="btn-1">Add to Cart</button>
                <button id="btn-2">Back to Home</button>
            </div>
            </main>
            <main id="second">
            <h1>Custmor reviews</h1>
            ${reviewsHTML}
            </main>
            </div>`;
            document.getElementById("btn-2").addEventListener("click",()=>{
                // window.history.go(-1); //we can use this one also....
                window.location.href="../Home/Home.html"
            });
            document.getElementById("btn-1").addEventListener("click",()=>{
                addTocart(selectedProduct);
            })
        }else{
            productDetails.innerHTML=`<p>Product Not Found....</p>`
        }
        // console.log(selectedProduct);
        
    }else{
        productDetails.innerHTML=`<p>Product Not Found..........</p>`
    }
})

function addTocart(product){
    let cart=JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart",JSON.stringify(cart))
    alert("Your Product added Successfully!!!")
}