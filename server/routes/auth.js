import express from 'express';
const router = express.Router();
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// @route POST /api/auth/register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }

    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await argon2.hash(password);
        const newUser = new User({
            username,
            password: hashedPassword,
        });
        await newUser.save();

        const accessToken = jwt.sign(
            { userId: newUser._id }, 
            process.env.ACCESS_TOKEN_SECRET);
        res.json({
            success: true,
            message: 'User registered successfully',
            accessToken
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route POST /api/auth/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing username and/or password' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Incorrect username' });
        }

        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }

        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({
            success: true,
            message: 'User logged in successfully',
            accessToken
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
