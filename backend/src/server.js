// src/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

// Función para conectar a MongoDB con reconexión automática
const connectWithRetry = () => {
  console.log("Intentando conectar a MongoDB...");
  
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // espera hasta 10 segundos
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch(err => {
    console.error("Error de conexión:", err.message);
    console.log("Reintentando en 5 segundos...");
    setTimeout(connectWithRetry, 5000); // reintenta cada 5 segundos
  });
};

// Llamar la función al inicio
connectWithRetry();

// Ruta de prueba
app.get("/", (req, res) => res.send("¡Servidor funcionando!"));

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));