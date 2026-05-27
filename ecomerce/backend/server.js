const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// Load environment variables
dotenv.config();

const app = express();

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ========== DATABASE CONNECTION ==========
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecomerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// ========== MODELS ==========
// Product Model
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: String,
    price: { type: Number, required: true },
    originalPrice: Number,
    description: String,
    image: String,
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    stock: { type: Number, default: 100 },
    badge: String,
    createdAt: { type: Date, default: Date.now }
});

// Hamper Schema (Birthday / Anniversary)
const hamperSchema = new mongoose.Schema({
    type: { type: String, enum: ['birthday','anniversary'], required: true },
    title: String,
    items: [{ productId: mongoose.Schema.Types.ObjectId, name: String, price: Number, quantity: Number }],
    message: String,
    theme: String,
    color: String,
    specialInstructions: String,
    price: Number,
    image: String,
    createdAt: { type: Date, default: Date.now }
});

// Wishlist Schema
const wishlistSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    items: [{ productId: mongoose.Schema.Types.ObjectId, name: String, price: Number, quantity: Number }],
    createdAt: { type: Date, default: Date.now }
});

// User Model
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    address: String,
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

// Order Model
const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    items: [{
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        price: Number,
        quantity: Number
    }],
    total: Number,
    status: { type: String, default: 'pending' },
    shippingAddress: String,
    paymentMethod: String,
    createdAt: { type: Date, default: Date.now }
});

// Review Model
const reviewSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);
const Review = mongoose.model('Review', reviewSchema);
const Hamper = mongoose.model('Hamper', hamperSchema);
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

// ========== ROUTES ==========

// ========== PRODUCTS ROUTES ==========
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/products', async (req, res) => {
    const product = new Product(req.body);
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ========== IMAGE UPLOAD ==========
// multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, unique + '-' + file.originalname);
    }
});
const upload = multer({ storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const urlPath = `/uploads/${req.file.filename}`;
    res.json({ message: 'Upload successful', path: urlPath });
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ========== USERS ROUTES ==========
// Auth helpers
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

app.post('/api/users/register', async (req, res) => {
    try {
        const hashed = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashed,
            phone: req.body.phone || null,
            address: req.body.address || null
        });
        const newUser = await user.save();
        res.status(201).json({ message: 'User registered', user: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/users/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' });
        res.json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ========== ORDERS ROUTES ==========
app.post('/api/orders', async (req, res) => {
    const order = new Order(req.body);
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/orders/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ========== HAMPER ROUTES ==========
app.post('/api/hamper', async (req, res) => {
    try {
        const hamper = new Hamper(req.body);
        const saved = await hamper.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/hamper/type/:type', async (req, res) => {
    try {
        const items = await Hamper.find({ type: req.params.type });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/hamper/:id', async (req, res) => {
    try {
        const item = await Hamper.findById(req.params.id);
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/hamper/:id', async (req, res) => {
    try {
        const updated = await Hamper.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/hamper/:id', async (req, res) => {
    try {
        await Hamper.findByIdAndDelete(req.params.id);
        res.json({ message: 'Hamper deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ========== WISHLIST ROUTES ==========
app.post('/api/wishlist', async (req, res) => {
    try {
        const w = new Wishlist(req.body);
        const saved = await w.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.get('/api/wishlist/user/:userId', async (req, res) => {
    try {
        const w = await Wishlist.findOne({ userId: req.params.userId });
        res.json(w);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/wishlist/:id', async (req, res) => {
    try {
        const updated = await Wishlist.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ========== REVIEWS ROUTES ==========
app.post('/api/reviews', async (req, res) => {
    const review = new Review(req.body);
    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/reviews/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ productId: req.params.productId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ========== ANALYTICS ROUTES ==========
app.get('/api/analytics/dashboard', async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);

        res.json({
            totalProducts,
            totalUsers,
            totalOrders,
            totalRevenue: totalRevenue[0]?.total || 0,
            topProducts: await Product.find().sort({ reviews: -1 }).limit(5)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ========== SEARCH ROUTE ==========
app.get('/api/search', async (req, res) => {
    try {
        const query = req.query.q;
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ========== FILTER ROUTES ==========
app.get('/api/products/filter/category/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/products/filter/price', async (req, res) => {
    try {
        const minPrice = req.query.min || 0;
        const maxPrice = req.query.max || 10000;
        const products = await Product.find({
            price: { $gte: minPrice, $lte: maxPrice }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ========== HEALTH CHECK ==========
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running', timestamp: new Date() });
});

// ========== ERROR HANDLING MIDDLEWARE ==========
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

module.exports = app;
