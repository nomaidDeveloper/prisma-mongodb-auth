import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;  // Use 3000 as the default port if PORT is not defined
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/prisma-mongodb-auth';  // Use the default URI if MONGO_URI is not defined

app.use(express.json());

app.use('/auth', authRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('MongoDB connection error:', error));
