// Cargar variables del entorno desde .env
require('dotenv').config();

// Importar dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importar rutas
const estudianteRoutes = require('./routes/estudianteRoutes');

// Crear la aplicación
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta principal para estudiantes
app.use('/api/estudiantes', estudianteRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(5000, () => {
      console.log('🚀 Servidor backend corriendo en puerto 5000');
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar con MongoDB:', err.message);
  }); 