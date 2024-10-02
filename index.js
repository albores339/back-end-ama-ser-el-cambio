const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/database/db');
const cors = require('cors');  // Importar cors

// Cargar las variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

// Configuración de CORS para permitir accesos desde el frontend en Vercel y localhost
const corsOptions = {
  origin: ['http://localhost:3000', 'https://front-ama-ser-el-cambio.vercel.app'], // Permitir localhost y Vercel
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true, // Permitir envío de cookies si es necesario
  allowedHeaders: ['Content-Type', 'Authorization'] // Asegúrate de permitir los encabezados necesarios
};

// Habilitar CORS con las opciones configuradas
app.use(cors(corsOptions));

// Middleware para solicitudes preflight (OPTIONS)
app.options('*', cors(corsOptions)); // Permitir todas las rutas con preflight (OPTIONS)

app.use(express.json());

// Rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/contact', require('./src/routes/contact'));
app.use('/api/users', require('./src/routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
