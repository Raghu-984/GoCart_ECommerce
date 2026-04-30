// ─── CURRENCY CONSTANT (same across all pages) ───────────────────────────────
const EXCHANGE_RATE = 83;

// ─── CART COUNT ───────────────────────────────────────────────────────────────
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cartCount").textContent = cart.length;
}

// ─── ADD TO CART (with duplicate check) ──────────────────────────────────────
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let alreadyExists = cart.some(item => item.id === product.id);
    if (alreadyExists) {
        alert("This product is already in your cart!");
        return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    // Visual feedback on button
    let btn = document.getElementById("btn-1");
    btn.textContent = "✅ Added to Cart";
    btn.classList.add("added");
    btn.disabled = true;
}

// ─── MAIN PAGE LOAD ───────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    let productDetails = document.getElementById("productDetails");
    let allproducts    = JSON.parse(localStorage.getItem("allproducts"));
    let productId      = localStorage.getItem("productId");

    if (!allproducts || !productId) {
        productDetails.innerHTML = `<p class="not-found">⚠️ Product not found. <a href="Home/Home.html">Go back to Home</a></p>`;
        return;
    }

    let selectedProduct = allproducts.find(v => v.id == productId);

    if (!selectedProduct) {
        productDetails.innerHTML = `<p class="not-found">⚠️ Product not found. <a href="Home/Home.html">Go back to Home</a></p>`;
        return;
    }

    let price = Math.floor(selectedProduct.price * EXCHANGE_RATE);

    // Check if already in cart — to reflect button state on load
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let inCart = cart.some(item => item.id === selectedProduct.id);

    // Build reviews HTML
    let reviewsHTML = "";
    if (selectedProduct.reviews && selectedProduct.reviews.length > 0) {
        selectedProduct.reviews.forEach(review => {
            let date = new Date(review.date).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric"
            });
            reviewsHTML += `
            <div class="review">
                <div class="stars">${"⭐".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
                <p class="comment">${review.comment}</p>
                <p class="reviewer">By <strong>${review.reviewerName}</strong> · ${date}</p>
            </div>`;
        });
    } else {
        reviewsHTML = `<p style="color:#aaa;font-size:14px;">No reviews yet.</p>`;
    }

    productDetails.innerHTML = `
    <div id="productDetaling">
        <div id="first">
            <div id="image">
                <img src="${selectedProduct.thumbnail}" alt="${selectedProduct.title}" />
            </div>
            <div id="details">
                <h1>${selectedProduct.title}</h1>
                <div class="meta-row">
                    ${selectedProduct.brand ? `<span class="badge">🏷️ ${selectedProduct.brand}</span>` : ""}
                    <span class="badge">📦 ${selectedProduct.category}</span>
                    <span class="badge">📊 Stock: ${selectedProduct.stock}</span>
                </div>
                <p class="description">${selectedProduct.description}</p>
                <p class="price">&#8377; ${price.toLocaleString('en-IN')}</p>
                <p class="rating-row">⭐ ${selectedProduct.rating} / 5</p>
                <div class="action-btns">
                    <button id="btn-1" ${inCart ? 'class="added" disabled' : ''}>
                        ${inCart ? "✅ Already in Cart" : "🛒 Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
        <div id="second">
            <h2>Customer Reviews</h2>
            ${reviewsHTML}
        </div>
    </div>`;

    // Attach event after rendering
    document.getElementById("btn-1").addEventListener("click", () => {
        addToCart(selectedProduct);
    });
});