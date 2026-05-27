const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// Create order
router.post('/', async (req, res) => {
    try {
        const order = new Order({
            userId: req.body.userId,
            items: req.body.items,
            subtotal: req.body.subtotal,
            tax: req.body.tax,
            shippingCost: req.body.shippingCost,
            total: req.body.total,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod
        });

        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all orders (admin)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('userId')
            .populate('items.productId')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user orders
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
            .populate('items.productId')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('userId')
            .populate('items.productId');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update order status
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { 
                status: req.body.status,
                paymentStatus: req.body.paymentStatus,
                trackingNumber: req.body.trackingNumber,
                notes: req.body.notes
            },
            { new: true }
        );
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Cancel order
router.put('/:id/cancel', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelled' },
            { new: true }
        );
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get order statistics
router.get('/stats/analytics', async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        const pendingOrders = await Order.countDocuments({ status: 'pending' });
        const shippedOrders = await Order.countDocuments({ status: 'shipped' });
        const deliveredOrders = await Order.countDocuments({ status: 'delivered' });

        res.json({
            totalOrders,
            totalRevenue: totalRevenue[0]?.total || 0,
            pendingOrders,
            shippedOrders,
            deliveredOrders
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
