if (localStorage.getItem("isLoggedIn") !== "true") {
        alert("Please login first");
        window.location.href = "../Login/Login.html";
}



let product=[];

function fetchData(){
    fetch("https://dummyjson.com/products").then((res)=>{
        return res.json();
    }).then((val)=>{
        // console.log(val.products);
        product=val.products;
        localStorage.setItem("allproducts",JSON.stringify(product))
        displayProduct(product)
    })
}


function displayProduct(prod){
    let output="";
    prod.map((val)=>{
        let price=Math.floor(val.price)*90;
        output +=`
        <main>
          <div id="image">
          <img src="${val.thumbnail}"/>
          </div>
          <h3>${val.title}</h3>
          <h4 id="price">&#8377;${price}</h4>
          <h4 id="rating">Rating: ${val.rating}</h4>
          <h4 id="stock">In Stock: ${val.stock}</h4>
          <button onclick="details(${val.id})">Details</button>
        </main>`
    })
    document.getElementById("productContainer").innerHTML=output;
}
fetchData();

document.getElementById("searchbar").addEventListener("input" ,function searchItem(event) {
    let searchTerm = event.target.value.toLowerCase();
    let filterProducts= product.filter((v)=>{
        return (
            v.title.toLowerCase().includes(searchTerm) ||
            v.category.toLowerCase().includes(searchTerm)
        );
    })
    displayProduct(filterProducts)
})

function details(productId){
    console.log(productId);
    localStorage.setItem("productId",productId);
    window.location.href="../ViewDetails/viewDetails.html"    
}

