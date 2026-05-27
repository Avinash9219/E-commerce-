// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// API Constants
const API = {
    PRODUCTS: `${API_BASE_URL}/products`,
    USERS: `${API_BASE_URL}/users`,
    ORDERS: `${API_BASE_URL}/orders`,
    CART: `${API_BASE_URL}/cart`,
    SEARCH: `${API_BASE_URL}/search`,
    REVIEWS: `${API_BASE_URL}/reviews`
};

// Helper function to make API calls
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(endpoint, options);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Product API Functions
const ProductAPI = {
    getAll: (params = {}) => {
        const query = new URLSearchParams(params).toString();
        return apiCall(`${API.PRODUCTS}?${query}`);
    },

    getById: (id) => apiCall(`${API.PRODUCTS}/${id}`),

    getByCategory: (category) => apiCall(`${API.PRODUCTS}/category/${category}`),

    search: (query) => apiCall(`${API.SEARCH}?q=${query}`),

    create: (productData) => apiCall(API.PRODUCTS, 'POST', productData),

    update: (id, productData) => apiCall(`${API.PRODUCTS}/${id}`, 'PUT', productData),

    delete: (id) => apiCall(`${API.PRODUCTS}/${id}`, 'DELETE'),

    getTrending: () => apiCall(`${API.PRODUCTS}/trending/all`),

    getBestSellers: () => apiCall(`${API.PRODUCTS}/bestsellers/all`)
};

// User API Functions
const UserAPI = {
    register: (userData) => apiCall(`${API.USERS}/register`, 'POST', userData),

    login: (email, password) => apiCall(`${API.USERS}/login`, 'POST', { email, password }),

    getProfile: (userId) => apiCall(`${API.USERS}/${userId}`),

    updateProfile: (userId, userData) => apiCall(`${API.USERS}/${userId}`, 'PUT', userData),

    addToWishlist: (userId, productId) => 
        apiCall(`${API.USERS}/${userId}/wishlist/${productId}`, 'POST'),

    removeFromWishlist: (userId, productId) => 
        apiCall(`${API.USERS}/${userId}/wishlist/${productId}`, 'DELETE'),

    getWishlist: (userId) => apiCall(`${API.USERS}/${userId}/wishlist`)
};

// Order API Functions
const OrderAPI = {
    create: (orderData) => apiCall(API.ORDERS, 'POST', orderData),

    getAll: () => apiCall(API.ORDERS),

    getById: (orderId) => apiCall(`${API.ORDERS}/${orderId}`),

    getByUserId: (userId) => apiCall(`${API.ORDERS}/user/${userId}`),

    update: (orderId, orderData) => apiCall(`${API.ORDERS}/${orderId}`, 'PUT', orderData),

    cancel: (orderId) => apiCall(`${API.ORDERS}/${orderId}/cancel`, 'PUT'),

    getStats: () => apiCall(`${API.ORDERS}/stats/analytics`)
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API, apiCall, ProductAPI, UserAPI, OrderAPI };
}
