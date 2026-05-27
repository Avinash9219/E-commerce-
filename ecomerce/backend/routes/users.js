const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register user
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const user = new User({
            firstName,
            lastName,
            email,
            password, // Hash this in production with bcryptjs
            phone
        });

        const newUser = await user.save();
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Simple password comparison (use bcryptjs in production)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.isActive) {
            return res.status(403).json({ message: 'Account is inactive' });
        }

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user profile
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('wishlist');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user profile
router.put('/:id', async (req, res) => {
    try {
        const { firstName, lastName, phone, address } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                firstName,
                lastName,
                phone,
                address
            },
            { new: true }
        );
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add to wishlist
router.post('/:userId/wishlist/:productId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.wishlist.includes(req.params.productId)) {
            user.wishlist.push(req.params.productId);
            await user.save();
        }

        const updated = await User.findById(req.params.userId).populate('wishlist');
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove from wishlist
router.delete('/:userId/wishlist/:productId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
        await user.save();

        const updated = await User.findById(req.params.userId).populate('wishlist');
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get user wishlist
router.get('/:userId/wishlist', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('wishlist');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete user account
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
