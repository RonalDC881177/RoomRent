import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware para leer JSON
app.use(express.json());

// Usar las rutas
app.use('/api/users', userRoutes);

export default app;