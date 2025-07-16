const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  direccion: {
    ciudad: String
  },
  fechaRegistro: Date
});

module.exports = mongoose.model('Cliente', clienteSchema);