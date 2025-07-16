require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importar rutas
const clienteRoutes = require('./routes/clienteRoutes');
const productoRoutes = require('./routes/productoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes'); // 📌 NUEVO

// Crear la app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Usar las rutas
app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/pedidos', pedidoRoutes); // 📌 NUEVO

// Conectar a MongoDB y levantar el servidor
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Conectado a MongoDB');
  app.listen(5000, () => {
    console.log('🚀 Servidor backend corriendo en http://localhost:5000');
  });
})
.catch((err) => {
  console.error('❌ Error al conectar:', err.message);
});