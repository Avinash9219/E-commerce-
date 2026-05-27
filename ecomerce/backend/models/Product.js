const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price']
    },
    originalPrice: {
        type: Number,
        default: null
    },
    category: {
        type: String,
        required: true,
        enum: ['mens', 'womens', 'jewelry', 'perfume', 'cosmetics', 'accessories', 'footwear', 'clothes']
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/300x300?text=Product'
    },
    images: [String],
    stock: {
        type: Number,
        default: 100,
        min: 0
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: {
        type: Number,
        default: 0
    },
    badge: {
        type: String,
        enum: ['New', 'Hot', 'Sale', null],
        default: null
    },
    specifications: {
        size: String,
        color: String,
        material: String,
        brand: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Index for better search performance
productSchema.index({ name: 'text', description: 'text', category: 1 });

module.exports = mongoose.model('Product', productSchema);
