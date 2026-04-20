import express from 'express';
import userRoutes from './routes/userRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware JSON
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

// Home
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

//rutas para mensajes
app.use("/api/message", messageRoutes);

export default app;