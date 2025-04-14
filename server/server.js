import express from 'express';
import { connect } from './config/db.js';
import 'dotenv/config'

import {authRouter } from './routes/auth.js';

connect();

const app = express();
app.use(express.json());

// app.get('/', (req, res) => res.send('Hello, world!'));
app.use('/api/auth', authRouter );

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));