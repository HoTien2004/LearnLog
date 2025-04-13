const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://tienho:8ipsmdDtA1LdSUrK@learning-diary-mern.rpdk6zb.mongodb.net/?retryWrites=true&w=majority&appName=learning-diary-mern', {

        });
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

connect();

const app = express();

// app.get('/', (req, res) => res.send('Hello, world!'));
app.use('/api/auth', authRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));