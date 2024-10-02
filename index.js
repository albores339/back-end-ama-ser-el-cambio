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
  origin: ['http://localhost:3000', 'https://front-ama-ser-el-cambio.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Habilitar CORS con las opciones configuradas
app.use(cors(corsOptions));

// Manejar las solicitudes preflight (OPTIONS)
app.options('*', cors(corsOptions));

// Esto es opcional: Middleware para establecer manualmente los encabezados necesarios en la respuesta
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://front-ama-ser-el-cambio.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});


app.use(express.json());

// Rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/contact', require('./src/routes/contact'));
app.use('/api/users', require('./src/routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
