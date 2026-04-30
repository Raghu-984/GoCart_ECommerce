// ─── CURRENCY CONSTANT (same across all pages) ───────────────────────────────
const EXCHANGE_RATE = 83;

// ─── LOAD CART ON PAGE READY ─────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    displayCart();
});

// ─── DISPLAY CART ─────────────────────────────────────────────────────────────
function displayCart() {
    let cart        = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContent = document.getElementById("cartContent");
    let totalSection = document.getElementById("totalSection");

    cartContent.innerHTML  = "";
    totalSection.innerHTML = "";

    // Empty state
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div id="empty">
                <div class="empty-icon">🛒</div>
                <p>Your cart is empty!</p>
                <a href="../Home/Home.html" class="shop-btn">Start Shopping</a>
            </div>`;
        return;
    }

    let totalBill = 0;

    cart.forEach((product, index) => {
        let price = Math.floor(product.price * EXCHANGE_RATE);
        totalBill += price;

        let card = document.createElement("div");
        card.classList.add("prod-info");

        card.innerHTML = `
            <div class="prod-img">
                <img src="${product.thumbnail}" alt="${product.title}" />
            </div>
            <div class="prod-details">
                <h3>${product.title}</h3>
                <p class="category">📦 ${product.category}</p>
                <p class="item-price">&#8377; ${price.toLocaleString('en-IN')}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">
                🗑️ Remove
            </button>`;

        cartContent.appendChild(card);
    });

    totalSection.innerHTML = `
        <h2>Total: &#8377; ${totalBill.toLocaleString('en-IN')}</h2>
        <button class="checkout-btn" onclick="alert('Checkout coming soon!')">
            Proceed to Checkout →
        </button>`;
}

// ─── REMOVE FROM CART ─────────────────────────────────────────────────────────
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(); // Refresh without reloading
}