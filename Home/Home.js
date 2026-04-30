// ─── AUTH GUARD ─────────────────────────────────────────────────────────────
if (localStorage.getItem("isLoggedIn") !== "true") {
    alert("Please login first");
    window.location.href = "../Login/Login.html";
}

// ─── CURRENCY CONSTANT (single source of truth) ──────────────────────────────
const EXCHANGE_RATE = 83;

// ─── STATE ───────────────────────────────────────────────────────────────────
let product = [];

// ─── HAMBURGER MENU ───────────────────────────────────────────────────────────
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu   = document.getElementById("mobileMenu");
const mobileOverlay = document.getElementById("mobileOverlay");
const closeMenuBtn = document.getElementById("closeMenu");

function openMobileMenu() {
    mobileMenu.classList.add("open");
    mobileOverlay.classList.add("active");
    hamburgerBtn.classList.add("active");
    document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    mobileOverlay.classList.remove("active");
    hamburgerBtn.classList.remove("active");
    document.body.style.overflow = "";
}

hamburgerBtn.addEventListener("click", openMobileMenu);
closeMenuBtn.addEventListener("click", closeMobileMenu);
mobileOverlay.addEventListener("click", closeMobileMenu);

// ─── USER NAME DISPLAY ────────────────────────────────────────────────────────
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
    document.getElementById("userName").textContent = "👋 " + currentUser.name;
    document.getElementById("mobileUserName").textContent = "👋 " + currentUser.name;
}

// ─── CART COUNT ───────────────────────────────────────────────────────────────
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cartCount").textContent = cart.length;
    document.getElementById("mobileCartCount").textContent = cart.length;
}
updateCartCount();

// ─── LOGOUT ───────────────────────────────────────────────────────────────────
function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "../Login/Login.html";
}

// ─── FETCH PRODUCTS ───────────────────────────────────────────────────────────
function fetchData() {
    document.getElementById("productContainer").innerHTML =
        `<p id="loadingMsg">⏳ Loading products...</p>`;

    fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(val => {
            product = val.products;
            localStorage.setItem("allproducts", JSON.stringify(product));
            displayProduct(product);
        })
        .catch(() => {
            document.getElementById("productContainer").innerHTML =
                `<p id="noResults">❌ Failed to load products. Please check your connection.</p>`;
        });
}

// ─── DISPLAY PRODUCTS ─────────────────────────────────────────────────────────
function displayProduct(prod) {
    let container = document.getElementById("productContainer");

    if (prod.length === 0) {
        container.innerHTML = `<p id="noResults">🔍 No products found.</p>`;
        return;
    }

    let output = "";
    prod.forEach(val => {
        let price = Math.floor(val.price * EXCHANGE_RATE);
        output += `
        <div class="product-card">
            <div class="image-wrap">
                <img src="${val.thumbnail}" alt="${val.title}" loading="lazy"/>
            </div>
            <h3 title="${val.title}">${val.title}</h3>
            <p class="price">&#8377; ${price.toLocaleString('en-IN')}</p>
            <div class="meta">
                <span class="rating">⭐ ${val.rating}</span>
                <span class="stock">Stock: ${val.stock}</span>
            </div>
            <button onclick="details(${val.id})">Details</button>
        </div>`;
    });

    container.innerHTML = output;
}

fetchData();

// ─── SEARCH / FILTER ─────────────────────────────────────────────────────────
document.getElementById("searchbar").addEventListener("input", function (event) {
    let searchTerm = event.target.value.toLowerCase().trim();
    let filtered = product.filter(v =>
        v.title.toLowerCase().includes(searchTerm) ||
        v.category.toLowerCase().includes(searchTerm)
    );
    displayProduct(filtered);
});

// ─── GO TO DETAILS PAGE ───────────────────────────────────────────────────────
function details(productId) {
    localStorage.setItem("productId", productId);
    window.location.href = "../ViewDetails/viewDetails.html";
}