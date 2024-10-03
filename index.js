const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/database/db');
const cors = require('cors');  // Importar cors

// Cargar las variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://front-ama-ser-el-cambio.vercel.app'], // Orígenes permitidos
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Métodos permitidos
  credentials: true, // Permitir envío de cookies o credenciales
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  preflightContinue: false, // No continuar después de la solicitud preflight
  optionsSuccessStatus: 204, // Estado de éxito para preflight
};

// Habilitar CORS con las opciones configuradas
app.use(cors(corsOptions));

// Manejar las solicitudes preflight (OPTIONS) para todas las rutas
app.options('*', cors(corsOptions));

// Middleware para analizar cuerpos de solicitud JSON
app.use(express.json());

// Rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/contact', require('./src/routes/contact'));
app.use('/api/users', require('./src/routes/users'));
app.use('/api/donations', require('./src/routes/donations'));
app.use('/api/expenses', require('./src/routes/expenses'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
