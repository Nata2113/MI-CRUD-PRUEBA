const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  codigoCliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  fechaPedido: String,
  metodoPago: String,
  productos: [
    {
      codigoProducto: String,
      nombre: String,
      cantidad: Number,
      precioUnitario: Number,
      totalComprado: Number
    }
  ],
  totalCompra: Number
});

module.exports = mongoose.model('Pedido', pedidoSchema);
