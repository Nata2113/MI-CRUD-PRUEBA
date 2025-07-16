const Pedido = require('../models/Pedido');

exports.crearPedido = async (req, res) => {
  try {
    const pedido = new Pedido({
      codigoCliente: req.body.clienteId,
      fechaPedido: req.body.fecha,
      metodoPago: req.body.metodoPago,
      productos: req.body.productos,
      totalCompra: req.body.totalCompra
    });
    await pedido.save();
    res.status(201).json(pedido);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.obtenerPedidosPorCliente = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ codigoCliente: req.params.id });
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.eliminarPedido = async (req, res) => {
  try {
    await Pedido.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pedido eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
