const categories = [
    { id: 'all', title: 'All Gifts' },
    { id: 'magic-mug', title: 'Magic Mug' },
    { id: 'normal-mug', title: 'Normal Mug' },
    { id: 'photo-frame', title: 'Photo Frame' },
    { id: 'cushion', title: 'Cushion' },
    { id: 't-shirt', title: 'T-Shirt' },
    { id: 'phone-case', title: 'Phone Case' },
    { id: 'key-chain', title: 'Key Chain' },
    { id: 'acrylic-keychain', title: 'Acrylic Keychain' },
    { id: 'stone-frame', title: 'Stone Frame' },
    { id: 'magic-mirror', title: 'Magic Mirror' },
    { id: 'sipper-bottle', title: 'Sipper Bottle' },
    { id: 'cap', title: 'Cap' },
    { id: 'round-neck', title: 'Round Neck T-Shirt' },
    { id: 'collar-t-shirt', title: 'Collar T-Shirt' },
    { id: 'tote-bag', title: 'Tote Bag' },
    { id: 'laptop-skin', title: 'Laptop Skin / Cover' },
    { id: 'couple-tshirts', title: 'Couple T-Shirts' },
    { id: 'kids-tshirts', title: 'Customized T-Shirts for Kids' }
];

const services = [
    { title: 'Name Printing', icon: 'fas fa-user-edit', description: 'Add names, initials, and elegant typography to every gift.' },
    { title: 'Photo Printing', icon: 'fas fa-camera', description: 'Bring your memories to life with vivid photo printing.' },
    { title: 'Logo Printing', icon: 'fas fa-briefcase', description: 'Brand your business with premium logo merchandise.' },
    { title: 'Couple Gifts', icon: 'fas fa-heart', description: 'Matching sets and romantic designs for couples.' },
    { title: 'Birthday Gifts', icon: 'fas fa-birthday-cake', description: 'Personalized birthday gifts with custom messages.' },
    { title: 'Anniversary Gifts', icon: 'fas fa-ring', description: 'Create memorable anniversary keepsakes.' }
];

const products = [
    {
        id: 1,
        title: 'Glow Magic Mug',
        category: 'magic-mug',
        price: 24.99,
        original: 34.99,
        badge: 'Hot',
        rating: 4.9,
        reviews: 230,
        image: 'assets/mug.jpeg',
        description: 'Reveal a surprise photo when your mug heats up — perfect for birthdays and anniversaries.'
    },
    {
        id: 2,
        title: 'Signature Coffee Mug',
        category: 'normal-mug',
        price: 18.49,
        original: 25.99,
        badge: 'New',
        rating: 4.8,
        reviews: 176,
        image: 'assets/mug.jpeg',
        description: 'Classic ceramic mug with premium name or quote personalization.'
    },
    {
        id: 3,
        title: 'Artisan Photo Frame',
        category: 'photo-frame',
        price: 27.99,
        original: 36.99,
        badge: 'Best Seller',
        rating: 4.7,
        reviews: 204,
        image: 'assets/photo-frame.jpeg',
        description: 'Premium frame for treasured memories, complete with custom engraving.'
    },
    {
        id: 4,
        title: 'Cloud Soft Cushion',
        category: 'cushion',
        price: 32.50,
        original: 42.00,
        badge: 'New',
        rating: 4.6,
        reviews: 154,
        image: 'assets/pillow.jpeg',
        description: 'Plush cushion printed with names, photos, or custom artwork.'
    },
    {
        id: 5,
        title: 'Urban Phone Case',
        category: 'phone-case',
        price: 22.99,
        original: 29.99,
        badge: 'Limited',
        rating: 4.8,
        reviews: 189,
        image: 'assets/phone-case.jpeg',
        description: 'Strong phone case with photo, initials, or brand logo printing.'
    },
    {
        id: 6,
        title: 'Couple T-Shirt Set',
        category: 'couple-tshirts',
        price: 45.99,
        original: 62.00,
        badge: 'Hot',
        rating: 4.9,
        reviews: 217,
        image: 'assets/tshirt.jpeg',
        description: 'Matching couple tees in soft cotton with romantic custom prints.'
    },
    {
        id: 7,
        title: 'Kids Custom Tee',
        category: 'kids-tshirts',
        price: 19.99,
        original: 26.99,
        badge: 'New',
        rating: 4.7,
        reviews: 142,
        image: 'assets/tshirt.jpeg',
        description: 'Fun kids tee personalized with names, stars, and playful artwork.'
    },
    {
        id: 8,
        title: 'Premium Sipper Bottle',
        category: 'sipper-bottle',
        price: 24.50,
        original: 31.00,
        badge: 'Best Seller',
        rating: 4.8,
        reviews: 160,
        image: 'assets/gift-set.jpeg',
        description: 'Travel sipper bottle with your custom logo or name design.'
    },
    {
        id: 9,
        title: 'Acrylic Keychain',
        category: 'acrylic-keychain',
        price: 12.99,
        original: 16.99,
        badge: 'New',
        rating: 4.7,
        reviews: 122,
        image: 'assets/gift-set.jpeg',
        description: 'Clear acrylic tag featuring your photo, logo, or message.'
    },
    {
        id: 10,
        title: 'Stone Memory Frame',
        category: 'stone-frame',
        price: 39.99,
        original: 49.99,
        badge: 'Premium',
        rating: 4.8,
        reviews: 113,
        image: 'assets/photo-frame.jpeg',
        description: 'Elegant stone frame with high-quality photo reproduction.'
    },
    {
        id: 11,
        title: 'Custom Cap',
        category: 'cap',
        price: 18.99,
        original: 24.50,
        badge: 'Hot',
        rating: 4.6,
        reviews: 134,
        image: 'assets/gift-set.jpeg',
        description: 'Premium cap with embroidered names, initials, or logos.'
    },
    {
        id: 12,
        title: 'Tote Bag Statement',
        category: 'tote-bag',
        price: 21.99,
        original: 28.99,
        badge: 'Best Seller',
        rating: 4.7,
        reviews: 148,
        image: 'assets/gift-set.jpeg',
        description: 'Sturdy tote bag featuring your print, logo, or message.'
    }
];

const reviews = [
    {
        name: 'Mia Rodriguez',
        role: 'Birthday Customer',
        rating: 5,
        message: 'The custom mug arrived quickly and the print quality was stunning. BOJ made the gift feel extra special.'
    },
    {
        name: 'Arjun Patel',
        role: 'Corporate Order',
        rating: 5,
        message: 'Excellent branding service for our team gifts. The logo print was crisp and premium.'
    },
    {
        name: 'Sara Nguyen',
        role: 'Anniversary Gift',
        rating: 5,
        message: 'Our couple t-shirts looked incredible. The packaging and attention to detail were impressive.'
    }
];

let activeCategory = 'all';
let cart = [];
let filteredProducts = [...products];

const categoryList = document.getElementById('categoryList');
const productGrid = document.getElementById('productGrid');
const trendingGrid = document.getElementById('trendingGrid');
const serviceGrid = document.getElementById('serviceGrid');
const reviewsGrid = document.getElementById('reviewsGrid');
const searchInput = document.getElementById('searchInput');
const customOrderForm = document.getElementById('customOrderForm');
const contactForm = document.getElementById('contactForm');
const reviewForm = document.getElementById('reviewForm');
const cartDrawer = document.getElementById('cartDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const reviewFeedback = document.getElementById('reviewFeedback');
const contactFeedback = document.getElementById('contactFeedback');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const categoryBar = document.getElementById('categoryBar');

function renderCategories() {
    categoryList.innerHTML = categories.map(cat => `
        <button class="category-chip ${cat.id === activeCategory ? 'active' : ''}" onclick="filterProducts('${cat.id}', this)">${cat.title}</button>
    `).join('');
}

function renderProducts(items) {
    if (!productGrid) return;
    if (!items.length) {
        productGrid.innerHTML = '<p class="empty-message">No gifts found for this category. Try another one.</p>';
        return;
    }

    productGrid.innerHTML = items.map(product => `
        <div class="product-card animate-fade-in">
            <div class="product-image-wrapper">
                <img class="product-image" src="${product.image}" alt="${product.title}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <button class="product-wishlist" onclick="toggleWishlist(${product.id}, event)" aria-label="Add to wishlist">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            
            <div class="product-body">
                <div class="product-meta">
                    <span class="product-rating">⭐ ${product.rating}</span>
                    <span class="product-reviews">${product.reviews} reviews</span>
                </div>
                
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                
                <div class="product-price-group">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    ${product.original > product.price ? `<span class="product-original-price">$${product.original.toFixed(2)}</span>` : ''}
                </div>
                
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-bag"></i> Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="document.getElementById('whatsappBtn').click()">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderTrending() {
    const trendingProducts = products.filter(product => product.badge === 'Hot' || product.badge === 'Best Seller').slice(0, 4);
    trendingGrid.innerHTML = trendingProducts.map(product => `
        <article class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <div class="product-card-body">
                <span class="badge ${product.badge ? product.badge.toLowerCase().replace(' ', '-') : ''}">${product.badge || 'Popular'}</span>
                <h3>${product.title}</h3>
                <div class="product-meta">
                    <span>${product.rating} ★</span>
                    <span>${product.reviews} reviews</span>
                </div>
                <div class="product-price">
                    <strong>$${product.price.toFixed(2)}</strong>
                    <span>$${product.original.toFixed(2)}</span>
                </div>
                <p>${product.description}</p>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </article>
    `).join('');
}

function renderServices() {
    if (!serviceGrid) return;
    serviceGrid.innerHTML = services.map(service => `
        <div class="card animate-fade-in">
            <div style="width: 60px; height: 60px; border-radius: 16px; background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 142, 83, 0.2)); display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-lg);">
                <i class="${service.icon}" style="font-size: 28px; color: var(--accent-primary);"></i>
            </div>
            <h3 style="margin-bottom: var(--spacing-md);">${service.title}</h3>
            <p class="text-muted">${service.description}</p>
        </div>
    `).join('');
}

function renderReviews() {
    if (!reviewsGrid) return;
    reviewsGrid.innerHTML = reviews.map(review => `
        <div class="testimonial-card">
            <div class="testimonial-rating">${'⭐'.repeat(review.rating)}${review.rating < 5 ? '☆'.repeat(5 - review.rating) : ''}</div>
            <p class="testimonial-text">"${review.message}"</p>
            <div class="testimonial-author">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary)); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1.25rem;">
                    ${review.name.charAt(0)}
                </div>
                <div class="testimonial-info">
                    <h4>${review.name}</h4>
                    <p class="testimonial-role">${review.role}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function filterProducts(category, btn) {
    activeCategory = category;
    if (!btn) {
        document.querySelectorAll('.category-chip').forEach(element => {
            element.classList.toggle('active', element.dataset.filter === category || element.textContent.toLowerCase().includes(category.replace(/-/g, ' ')));
        });
    } else {
        document.querySelectorAll('.category-chip').forEach(element => element.classList.remove('active'));
        btn.classList.add('active');
    }

    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    renderProducts(filteredProducts);
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    const searchResults = products.filter(product => {
        return product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            categories.find(category => category.id === product.category)?.title.toLowerCase().includes(query);
    });

    renderProducts(query ? searchResults : (activeCategory === 'all' ? products : products.filter(product => product.category === activeCategory)));
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    renderCartItems();
    openCart();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function renderCartItems() {
    if (!cart.length) {
        cartItems.innerHTML = '<p class="text-muted" style="text-align: center; padding: var(--spacing-2xl) 0;">Your cart is empty. Start adding premium gifts.</p>';
        cartTotal.textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="card" style="display: flex; gap: var(--spacing-md); align-items: flex-start; padding: var(--spacing-lg); margin-bottom: var(--spacing-md);">
            <img src="${item.image}" alt="${item.title}" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover;">
            <div style="flex: 1;">
                <h4 style="margin-bottom: 4px;">${item.title}</h4>
                <p class="text-muted" style="font-size: 0.875rem; margin-bottom: var(--spacing-md);">${item.quantity} × $${item.price.toFixed(2)}</p>
                <div class="flex" style="justify-content: space-between;">
                    <strong style="color: var(--accent-primary);">$${(item.quantity * item.price).toFixed(2)}</strong>
                    <button class="btn btn-ghost" style="padding: 6px 12px; font-size: 0.75rem;" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCartItems();
}

function toggleCart() {
    const cartDrawer = document.getElementById('cartDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (!cartDrawer) return;

    const isOpen = cartDrawer.classList.toggle('open');
    if (drawerOverlay) {
        drawerOverlay.classList.toggle('active', isOpen);
    }
    cartDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    document.body.style.overflow = isOpen ? 'hidden' : '';

    if (isOpen) {
        renderCartItems();
    }
}

function openCart() {
    const cartDrawer = document.getElementById('cartDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    if (!cartDrawer) return;

    cartDrawer.classList.add('open');
    if (drawerOverlay) {
        drawerOverlay.classList.add('active');
    }
    cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    renderCartItems();
}

function setTheme(theme) {
    const root = document.body;
    const next = theme === 'dark' ? 'dark' : 'light';
    root.classList.toggle('dark', next === 'dark');
    localStorage.setItem('bojTheme', next);
    if (themeToggleBtn) {
        themeToggleBtn.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
}

function initTheme() {
    const savedTheme = localStorage.getItem('bojTheme');
    const defaultTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(defaultTheme);
}

function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleCustomOrder(event) {
    event.preventDefault();
    const product = document.getElementById('customProduct').value;
    const notes = document.getElementById('customNotes').value.trim();
    if (!notes) {
        alert('Please provide your personalization details to continue.');
        return;
    }
    alert(`Thanks! Your custom order request for ${product} has been received. We will contact you shortly.`);
    customOrderForm.reset();
}

function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message || !email.includes('@')) {
        contactFeedback.textContent = 'Please complete the form with a valid email address.';
        return;
    }

    contactFeedback.textContent = 'Thanks! Your message has been sent to BOJ support.';
    contactForm.reset();
}

function handleReviewSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('reviewName').value.trim();
    const rating = Number(document.getElementById('reviewRating').value);
    const message = document.getElementById('reviewMessage').value.trim();

    if (!name || !message) {
        reviewFeedback.textContent = 'Please add your name and review message.';
        return;
    }

    reviews.unshift({ name, role: 'Happy Customer', rating, message });
    renderReviews();
    reviewFeedback.textContent = 'Review submitted — thank you for your feedback!';
    reviewForm.reset();
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
    }
}

function toggleWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.indexOf(productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
    } else {
        wishlist.push(productId);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Update UI
    const button = event?.currentTarget;
    if (!button) return;
    if (index > -1) {
        button.innerHTML = '<i class="far fa-heart"></i>';
    } else {
        button.innerHTML = '<i class="fas fa-heart"></i>';
    }
}

/* ========================================
   HAMPER BUILDER (Birthday/Anniversary)
   ======================================== */

const hamperState = {
    type: 'birthday',
    items: [],
    message: '',
    deliveryNotes: '',
    theme: 'classic',
    color: '#ff6b6b'
};

const hamperEls = {
    products: document.getElementById('hamperProducts'),
    items: document.getElementById('hamperItems'),
    total: document.getElementById('hamperTotal'),
    availableCount: document.getElementById('hamperAvailableCount'),
    message: document.getElementById('hamperMessage'),
    deliveryNotes: document.getElementById('hamperDeliveryNotes'),
    theme: document.getElementById('hamperTheme'),
    color: document.getElementById('hamperColor')
};

function getHamperTotal() {
    return hamperState.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function persistHamper() {
    try {
        localStorage.setItem('boj_hamper', JSON.stringify(hamperState));
    } catch (_) {}
}

function loadHamper() {
    try {
        const saved = JSON.parse(localStorage.getItem('boj_hamper') || 'null');
        if (!saved) return;
        hamperState.type = saved.type || hamperState.type;
        hamperState.items = Array.isArray(saved.items) ? saved.items : [];
        hamperState.message = saved.message || '';
        hamperState.deliveryNotes = saved.deliveryNotes || '';
        hamperState.theme = saved.theme || 'classic';
        hamperState.color = saved.color || '#ff6b6b';
    } catch (_) {}
}

function setHamperType(type, btn) {
    hamperState.type = type;
    document.querySelectorAll('#hamperBuilder .hamper-tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    persistHamper();
    renderHamper();
}

function addToHamper(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = hamperState.items.find(x => x.productId === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        hamperState.items.push({
            productId,
            title: product.title,
            price: product.price,
            quantity: 1
        });
    }
    persistHamper();
    renderHamper();
    syncOrderSummary();
}

function decrementHamperItem(productId) {
    const item = hamperState.items.find(x => x.productId === productId);
    if (!item) return;
    item.quantity = Math.max(0, item.quantity - 1);
    hamperState.items = hamperState.items.filter(x => x.quantity > 0);
    persistHamper();
    renderHamper();
    syncOrderSummary();
}

function removeHamperItem(productId) {
    hamperState.items = hamperState.items.filter(x => x.productId !== productId);
    persistHamper();
    renderHamper();
    syncOrderSummary();
}

function resetHamper() {
    hamperState.items = [];
    hamperState.message = '';
    hamperState.deliveryNotes = '';
    hamperState.theme = 'classic';
    hamperState.color = '#ff6b6b';

    if (hamperEls.message) hamperEls.message.value = '';
    if (hamperEls.deliveryNotes) hamperEls.deliveryNotes.value = '';
    if (hamperEls.theme) hamperEls.theme.value = hamperState.theme;
    if (hamperEls.color) hamperEls.color.value = hamperState.color;

    persistHamper();
    renderHamper();
    syncOrderSummary();
}

function renderHamperProducts() {
    if (!hamperEls.products) return;
    if (hamperEls.availableCount) hamperEls.availableCount.textContent = String(products.length);

    hamperEls.products.innerHTML = products.map(p => `
        <button type="button" class="hamper-product-item" onclick="addToHamper(${p.id})" title="Add ${p.title}">
            <div style="display:flex; align-items:center; justify-content:space-between; gap: 10px; margin-bottom: 8px;">
                <strong style="font-size: 0.95rem; color: var(--text-primary);">${p.title}</strong>
                <span style="color: var(--accent-primary); font-weight: 800;">₹${p.price.toFixed(0)}</span>
            </div>
            <div class="text-muted" style="font-size: 0.8rem; line-height: 1.6;">${p.description}</div>
            <div style="margin-top: 10px; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size: 0.85rem; color: var(--accent-tertiary); font-weight: 700;">★ ${p.rating}</span>
                <span style="font-size: 0.8rem; color: var(--text-light);">${p.reviews} reviews</span>
            </div>
        </button>
    `).join('');
}

function renderHamperItems() {
    if (!hamperEls.items) return;
    if (!hamperState.items.length) {
        hamperEls.items.innerHTML = '<p class="empty-note">Start adding premium items to your hamper.</p>';
        return;
    }

    hamperEls.items.innerHTML = hamperState.items.map(item => `
        <div class="hamper-item">
            <div>
                <strong style="color: var(--text-primary);">${item.title}</strong>
                <div class="text-muted" style="font-size: 0.85rem; margin-top: 4px;">₹${item.price.toFixed(2)} × ${item.quantity}</div>
            </div>
            <div style="display:flex; align-items:center; gap: 10px;">
                <button type="button" class="btn tiny" style="background: rgba(255,255,255,0.06);" onclick="decrementHamperItem(${item.productId})" aria-label="Decrease quantity">−</button>
                <button type="button" class="btn tiny danger" onclick="removeHamperItem(${item.productId})" aria-label="Remove item">Remove</button>
            </div>
        </div>
    `).join('');
}

function renderHamper() {
    if (hamperEls.message) hamperEls.message.value = hamperState.message;
    if (hamperEls.deliveryNotes) hamperEls.deliveryNotes.value = hamperState.deliveryNotes;
    if (hamperEls.theme) hamperEls.theme.value = hamperState.theme;
    if (hamperEls.color) hamperEls.color.value = hamperState.color;

    renderHamperItems();
    const total = getHamperTotal();
    if (hamperEls.total) hamperEls.total.textContent = `₹${total.toFixed(0)}`;
}

function hamperWhatsAppText() {
    const total = getHamperTotal();
    const lines = [
        `Hi BOJ — I want to order a ${hamperState.type} hamper.`,
        '',
        'Selected items:'
    ];

    hamperState.items.forEach(i => {
        lines.push(`• ${i.title} × ${i.quantity} — ₹${(i.price * i.quantity).toFixed(0)}`);
    });

    lines.push('', `Estimated total: ₹${total.toFixed(0)}`);

    if (hamperState.theme) lines.push(`Theme: ${hamperState.theme}`);
    if (hamperState.color) lines.push(`Accent: ${hamperState.color}`);

    if (hamperState.message?.trim()) {
        lines.push('', 'Message:', hamperState.message.trim());
    }
    if (hamperState.deliveryNotes?.trim()) {
        lines.push('', 'Delivery notes:', hamperState.deliveryNotes.trim());
    }

    return lines.join('\n');
}

function shareHamperOnWhatsApp() {
    if (!hamperState.items.length) {
        alert('Please add at least one item to your hamper.');
        return;
    }
    const text = hamperWhatsAppText();
    window.open(`https://wa.me/19255360036?text=${encodeURIComponent(text)}`, '_blank');
}

/* ========================================
   ORDER FORM + WHATSAPP CHECKOUT
   ======================================== */

const orderEls = {
    summary: document.getElementById('orderSummary'),
    subtotal: document.getElementById('orderSubtotal'),
    total: document.getElementById('orderTotal'),
    feedback: document.getElementById('orderFeedback'),
    form: document.getElementById('orderForm')
};

function orderItemsSource() {
    // Prefer hamper builder items for luxury hamper flow; fall back to cart.
    if (hamperState.items.length) return hamperState.items.map(i => ({ title: i.title, quantity: i.quantity, price: i.price }));
    return cart.map(i => ({ title: i.title, quantity: i.quantity, price: i.price }));
}

function syncOrderSummary() {
    if (!orderEls.summary) return;
    const items = orderItemsSource();
    if (!items.length) {
        orderEls.summary.innerHTML = '<p class="empty-note">Your summary will appear here after you add products or build a hamper.</p>';
        orderEls.subtotal.textContent = '₹0';
        orderEls.total.textContent = '₹0';
        return;
    }
    orderEls.summary.innerHTML = items.map(i => `
        <div class="item-row">
            <span style="color: var(--text-primary); font-weight: 600;">${i.title} × ${i.quantity}</span>
            <strong style="color: var(--accent-primary);">₹${(i.price * i.quantity).toFixed(0)}</strong>
        </div>
    `).join('');
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    orderEls.subtotal.textContent = `₹${subtotal.toFixed(0)}`;
    orderEls.total.textContent = `₹${subtotal.toFixed(0)}`;
}

function readOrderForm() {
    return {
        fullName: document.getElementById('orderFullName')?.value.trim() || '',
        mobile: document.getElementById('orderMobile')?.value.trim() || '',
        address: document.getElementById('orderAddress')?.value.trim() || '',
        city: document.getElementById('orderCity')?.value.trim() || '',
        state: document.getElementById('orderState')?.value.trim() || '',
        pincode: document.getElementById('orderPincode')?.value.trim() || '',
        deliveryDate: document.getElementById('orderDeliveryDate')?.value || '',
        specialMessage: document.getElementById('orderSpecialMessage')?.value.trim() || ''
    };
}

function validateOrderForm(form) {
    if (!form.fullName) return 'Full name is required.';
    if (!/^[0-9]{10}$/.test(form.mobile)) return 'Mobile number must be 10 digits.';
    if (!form.address) return 'Address is required.';
    if (!form.city) return 'City is required.';
    if (!form.state) return 'State is required.';
    if (!/^[0-9]{6}$/.test(form.pincode)) return 'Pincode must be 6 digits.';
    if (!form.deliveryDate) return 'Delivery date is required.';
    return null;
}

function orderWhatsAppText(includeCustomer = true) {
    const items = orderItemsSource();
    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const lines = ['Hi BOJ — I would like to place an order.', ''];

    if (hamperState.items.length) {
        lines.push(`Hamper type: ${hamperState.type}`);
        if (hamperState.theme) lines.push(`Theme: ${hamperState.theme}`);
        if (hamperState.color) lines.push(`Accent: ${hamperState.color}`);
        lines.push('');
    }

    lines.push('Order items:');
    items.forEach(i => lines.push(`• ${i.title} × ${i.quantity} — ₹${(i.price * i.quantity).toFixed(0)}`));
    lines.push('', `Total: ₹${subtotal.toFixed(0)}`);

    if (hamperState.message?.trim()) lines.push('', `Hamper message: ${hamperState.message.trim()}`);
    if (hamperState.deliveryNotes?.trim()) lines.push('', `Delivery notes: ${hamperState.deliveryNotes.trim()}`);

    if (includeCustomer) {
        const form = readOrderForm();
        lines.push(
            '',
            'Customer details:',
            `Name: ${form.fullName}`,
            `Mobile: ${form.mobile}`,
            `Address: ${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
            `Delivery date: ${form.deliveryDate}`
        );
        if (form.specialMessage) lines.push(`Special message: ${form.specialMessage}`);
    }

    return lines.join('\n');
}

function sendOrderToWhatsApp() {
    const text = orderWhatsAppText(false);
    if (!orderItemsSource().length) {
        alert('Please add products or build a hamper before ordering.');
        return;
    }
    window.open(`https://wa.me/19255360036?text=${encodeURIComponent(text)}`, '_blank');
}

function handleOrderSubmit(e) {
    e.preventDefault();
    const form = readOrderForm();
    const err = validateOrderForm(form);
    if (err) {
        if (orderEls.feedback) orderEls.feedback.textContent = err;
        return;
    }
    if (orderEls.feedback) orderEls.feedback.textContent = 'Looks good. Opening WhatsApp to confirm your order…';
    window.open(`https://wa.me/19255360036?text=${encodeURIComponent(orderWhatsAppText(true))}`, '_blank');
}

if (hamperEls.message) hamperEls.message.addEventListener('input', (e) => { hamperState.message = e.target.value; persistHamper(); });
if (hamperEls.deliveryNotes) hamperEls.deliveryNotes.addEventListener('input', (e) => { hamperState.deliveryNotes = e.target.value; persistHamper(); });
if (hamperEls.theme) hamperEls.theme.addEventListener('change', (e) => { hamperState.theme = e.target.value; persistHamper(); });
if (hamperEls.color) hamperEls.color.addEventListener('change', (e) => { hamperState.color = e.target.value; persistHamper(); });

if (orderEls.form) orderEls.form.addEventListener('submit', handleOrderSubmit);

function checkout() {
    if (!cart.length) {
        alert('Your cart is empty. Add items before checking out.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Proceeding to checkout with ${cart.length} item(s) for $${total.toFixed(2)}. Please complete your order through a secure payment gateway.`);
    
    // Toggle cart closed after checkout initiation
    toggleCart();
    
    // Optional: Clear cart or redirect to payment gateway
    // window.location.href = 'https://your-payment-gateway.com/checkout';
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

if (drawerOverlay) {
    drawerOverlay.addEventListener('click', toggleCart);
}

if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

if (customOrderForm) {
    customOrderForm.addEventListener('submit', handleCustomOrder);
}

if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
}

if (reviewForm) {
    reviewForm.addEventListener('submit', handleReviewSubmit);
}

window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderCategories();
    renderProducts(products);
    renderTrending();
    renderServices();
    renderReviews();
    renderCartItems();
    updateCartCount();

    loadHamper();
    renderHamperProducts();
    renderHamper();
    syncOrderSummary();
});
