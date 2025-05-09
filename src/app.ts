import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
// import transactionRoutes from './routes/transaction.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
// app.use('/transactions', transactionRoutes);

export default app;