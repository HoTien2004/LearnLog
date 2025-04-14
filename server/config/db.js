import mongoose from 'mongoose';
import 'dotenv/config'

export const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learning-diary-mern.rpdk6zb.mongodb.net/?retryWrites=true&w=majority&appName=learning-diary-mern`, {

        });
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}