/* ========== WISHLIST FUNCTIONALITY ========== */

// Initialize wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

/* ========== ADD TO WISHLIST ========== */
function addToWishlist(productId) {
    const product = getProduct(productId);
    if (!product) return;

    const existingItem = wishlist.find(item => item.id === product.id);

    if (existingItem) {
        // Remove if already in wishlist
        wishlist = wishlist.filter(item => item.id !== product.id);
        showNotification(`${product.name} removed from wishlist`);
    } else {
        // Add to wishlist
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            addedAt: new Date().toISOString()
        });
        showNotification(`${product.name} added to wishlist!`);
    }

    saveWishlist();
    updateWishlistCount();
    updateWishlistButtons();
}

/* ========== REMOVE FROM WISHLIST ========== */
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    saveWishlist();
    updateWishlistCount();
    displayWishlistItems();
    updateWishlistButtons();
    showNotification('Item removed from wishlist');
}

/* ========== DISPLAY WISHLIST ITEMS ========== */
function displayWishlistItems() {
    const wishlistItemsContainer = document.getElementById('wishlistItems');

    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = '<p style="text-align: center; color: #999;">Your wishlist is empty</p>';
        return;
    }

    let html = '';

    wishlist.forEach(item => {
        html += `
            <div class="wishlist-item">
                <img src="${item.image}" style="width: 60px; height: 60px; border-radius: 5px; object-fit: cover;">
                <div class="item-info" style="flex: 1; margin-left: 15px;">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-add-cart" onclick="addToCart(${item.id}); removeFromWishlist(${item.id});" style="padding: 8px 15px; font-size: 12px;">Move to Cart</button>
                    <button class="remove-btn" onclick="removeFromWishlist(${item.id})">🗑️</button>
                </div>
            </div>
        `;
    });

    wishlistItemsContainer.innerHTML = html;
}

/* ========== UPDATE WISHLIST COUNT BADGE ========== */
function updateWishlistCount() {
    document.getElementById('wishlist-count').textContent = wishlist.length;
}

/* ========== UPDATE WISHLIST BUTTONS ========== */
function updateWishlistButtons() {
    document.querySelectorAll('.btn-add-wishlist').forEach(btn => {
        const productCard = btn.closest('.product-card');
        if (productCard) {
            const productNameEl = productCard.querySelector('.product-name');
            const productName = productNameEl.textContent;
            const product = products.find(p => p.name === productName);

            if (product && isInWishlist(product.id)) {
                btn.style.backgroundColor = '#f596d3';
                btn.style.color = 'white';
            } else {
                btn.style.backgroundColor = '#f5f5f5';
                btn.style.color = '#666';
            }
        }
    });
}

/* ========== CHECK IF ITEM IN WISHLIST ========== */
function isInWishlist(productId) {
    return wishlist.some(item => item.id === productId);
}

/* ========== TOGGLE WISHLIST MODAL ========== */
function toggleWishlist() {
    const modal = document.getElementById('wishlistModal');
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        displayWishlistItems();
    }
}

/* ========== SAVE WISHLIST TO LOCALSTORAGE ========== */
function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

/* ========== SEND WISHLIST TO EMAIL ========== */
function shareWishlist() {
    if (wishlist.length === 0) {
        alert('Your wishlist is empty!');
        return;
    }

    let wishlistText = 'My Wishlist from BOJ - Box of Joy:\n\n';
    wishlist.forEach(item => {
        wishlistText += `${item.name} - $${item.price}\n`;
    });
    wishlistText += `\nTotal Items: ${wishlist.length}`;

    const mailtoLink = `mailto:?subject=My Wishlist&body=${encodeURIComponent(wishlistText)}`;
    window.location.href = mailtoLink;
}

/* ========== EXPORT WISHLIST ========== */
function exportWishlist() {
    const wishlistData = {
        items: wishlist,
        exportDate: new Date().toISOString(),
        totalItems: wishlist.length,
        totalValue: wishlist.reduce((sum, item) => sum + item.price, 0)
    };

    // Create CSV export
    let csv = 'Product Name,Price,Category,Added Date\n';
    wishlist.forEach(item => {
        const addedDate = new Date(item.addedAt).toLocaleDateString();
        csv += `"${item.name}",${item.price},"${item.category}","${addedDate}"\n`;
    });

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', `wishlist_${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showNotification('Wishlist exported as CSV');
}

/* ========== ADD WISHLIST ACTIONS TO MODAL ========== */
document.addEventListener('DOMContentLoaded', function() {
    // Add actions button to wishlist modal
    const wishlistModal = document.getElementById('wishlistModal');
    if (wishlistModal) {
        const modalContent = wishlistModal.querySelector('.modal-content');
        if (modalContent) {
            const actionsDiv = document.createElement('div');
            actionsDiv.style.cssText = 'display: flex; gap: 10px; margin-top: 20px; justify-content: center;';
            actionsDiv.innerHTML = `
                <button onclick="shareWishlist()" style="padding: 10px 20px; background-color: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer;">Share via Email</button>
                <button onclick="exportWishlist()" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Export CSV</button>
            `;
            // Note: This is added dynamically, make sure to add it properly in HTML if needed
        }
    }
});

/* ========== GET WISHLIST FOR BACKEND ========== */
function getWishlistData() {
    return {
        items: wishlist,
        count: wishlist.length,
        lastUpdated: new Date().toISOString()
    };
}
