/* ========== SHOPPING CART FUNCTIONALITY ========== */

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/* ========== ADD TO CART ========== */
function addToCart(productId, quantity = 1) {
    const product = getProduct(productId);
    if (!product) return;

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

/* ========== REMOVE FROM CART ========== */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    displayCartItems();
    showNotification('Item removed from cart');
}

/* ========== UPDATE CART QUANTITY ========== */
function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        if (item.quantity === 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            displayCartItems();
        }
    }
}

/* ========== DISPLAY CART ITEMS ========== */
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #999;">Your cart is empty</p>';
        updateCartTotal();
        return;
    }

    let html = '';

    cart.forEach(item => {
        html += `
            <div class="cart-item">
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="item-quantity">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div style="font-weight: bold; min-width: 80px; text-align: right;">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    updateCartTotal();
}

/* ========== CALCULATE CART TOTAL ========== */
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/* ========== UPDATE CART TOTAL DISPLAY ========== */
function updateCartTotal() {
    const subtotal = calculateCartTotal();
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById('cartSubtotal').textContent = subtotal.toFixed(2);
    document.getElementById('cartTax').textContent = tax.toFixed(2);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

/* ========== UPDATE CART COUNT BADGE ========== */
function updateCartCount() {
    const totalItems = cart.reduce((count, item) => count + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

/* ========== TOGGLE CART MODAL ========== */
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        displayCartItems();
    }
}

/* ========== SAVE CART TO LOCALSTORAGE ========== */
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/* ========== CLEAR CART ========== */
function clearCart() {
    if (confirm('Are you sure you want to clear the cart?')) {
        cart = [];
        saveCart();
        updateCartCount();
        displayCartItems();
        showNotification('Cart cleared');
    }
}

/* ========== NOTIFICATION FUNCTION ========== */
function showNotification(message, typeOrDuration = 'success', duration = 3000) {
    const colors = { success: '#10b981', warning: '#f59e0b', error: '#ef4444' };
    let type = 'success';
    let dur = duration;
    if (typeof typeOrDuration === 'number') {
        dur = typeOrDuration;
    } else {
        type = typeOrDuration;
    }

    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${colors[type] || colors.success};
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, dur);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ========== EXPORT CART FOR BACKEND ========== */
function getCartForCheckout() {
    return {
        items: cart,
        subtotal: calculateCartTotal(),
        tax: calculateCartTotal() * 0.1,
        total: calculateCartTotal() * 1.1
    };
}
