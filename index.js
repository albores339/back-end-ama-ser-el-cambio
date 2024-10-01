const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/database/db');

// Cargar las variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();
app.use(express.json());

// Rutas
app.use('/api/auth', require('./src/routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
