// src/app.ts
import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/database';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app: Application = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Middleware de manejo de errores - debe ir después de las rutas
app.use(errorMiddleware);

export default app;