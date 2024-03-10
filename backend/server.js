import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import threadRoutes from './routes/threadRoutes.js';
import userRoutes from './routes/userRoutes.js';
import replyRoutes from './routes/replyRoutes.js';

dotenv.config();
await connectDB();

const port = process.env.PORT || 5000;
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/threads', threadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/replies', replyRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));