const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with filters
router.get('/', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search, sort } = req.query;
        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        let query = Product.find(filter);

        if (sort === 'price-asc') {
            query = query.sort({ price: 1 });
        } else if (sort === 'price-desc') {
            query = query.sort({ price: -1 });
        } else if (sort === 'newest') {
            query = query.sort({ createdAt: -1 });
        } else if (sort === 'rating') {
            query = query.sort({ rating: -1 });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        const products = await query.exec();
        const totalCount = await Product.countDocuments(filter);

        res.json({
            products,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalProducts: totalCount,
                productsPerPage: limit
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create product (admin only)
router.post('/', async (req, res) => {
    const product = new Product(req.body);
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update product
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get trending products
router.get('/trending/all', async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ reviews: -1 })
            .limit(10);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get best sellers
router.get('/bestsellers/all', async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ rating: -1 })
            .limit(5);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search products
router.get('/search/all', async (req, res) => {
    try {
        const { q } = req.query;
        const products = await Product.find({
            $or: [
                { name: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } }
            ]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
