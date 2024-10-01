const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/database/db');
const cors = require('cors');  // Importar cors

// Cargar las variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// Habilitar CORS
app.use(cors());

app.use(express.json());

// Rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/contact', require('./src/routes/contact'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
