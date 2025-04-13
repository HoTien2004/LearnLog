const express = require('express');
const router = express.Router();
const argon2 = require('argon2');

const User = require('../models/User');

// @route POST /api/auth/register
// @desc Register a new user
// @access Public
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }

    try {
        // Check if user already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // All good & hash password
        // Hash password using argon2
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
            username,
            password: hashedPassword,
        });

        // Return token
        await newUser.save();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;