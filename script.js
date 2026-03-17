// ---------- INITIALIZE CART ----------
var cart = JSON.parse(localStorage.getItem("cart"));
if (!Array.isArray(cart)) {
    cart = [];
}

// ---------- ADD TO CART ----------
function addToCart(name, price) {
    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].qty++;
            found = true;
            break;
        }
    }

    if (!found) {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    saveCart();
    alert(name + " added to cart");
}

// ---------- SAVE CART ----------
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    loadCart();
}

// ---------- LOAD CART ----------
function loadCart() {
    let cartItems = document.getElementById("cartItems");
    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].qty;

        cartItems.innerHTML += `
            <p>
                ${cart[i].name} - ₹${cart[i].price}
                <button onclick="decreaseQty(${i})">-</button>
                ${cart[i].qty}
                <button onclick="increaseQty(${i})">+</button>
                <button onclick="removeItem(${i})">Remove</button>
            </p>
        `;
    }

    document.getElementById("total").innerText = total;
}

// ---------- QUANTITY ----------
function increaseQty(i) {
    cart[i].qty++;
    saveCart();
}

function decreaseQty(i) {
    if (cart[i].qty > 1) {
        cart[i].qty--;
    } else {
        cart.splice(i, 1);
    }
    saveCart();
}

function removeItem(i) {
    cart.splice(i, 1);
    saveCart();
}

// ---------- CART COUNT ----------
function updateCartCount() {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
        count += cart[i].qty;
    }

    let el = document.getElementById("cartCount");
    if (el) el.innerText = count;
}
updateCartCount();

// ---------- LOGOUT ----------
function logout() {
    localStorage.clear();
    window.location.href = "card-verification.html";
}

// ---------- PLACE ORDER ----------
function placeOrder() {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}
