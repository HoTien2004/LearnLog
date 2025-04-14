import express from 'express';
const router  = express.Router();
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

// @route POST /api/auth/register
// @desc Register a new user
// @access Public
const authRouter = router.post('/register', async (req, res) => {
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
        await newUser.save();

        // Return token
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
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
// @desc Login user
// @access Public

const loginUser = router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Missing username and/or password' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Incorrect username' });
        }

        // Username found, check password
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }

        //All good
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
        res.json({
            success: true,
            message: 'User Logged successfully',
            accessToken
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export { authRouter, loginUser };