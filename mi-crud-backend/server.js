require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importar rutas
const estudianteRoutes = require('./routes/estudianteRoutes');

// Crear la app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Usar las rutas
app.use('/api/estudiantes', estudianteRoutes);

// Conectar a MongoDB y levantar el servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(5000, () => {
      console.log('🚀 Servidor backend corriendo en puerto 5000');
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar:', err.message);
  });