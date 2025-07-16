const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/', pedidoController.crearPedido);
router.get('/cliente/:id', pedidoController.obtenerPedidosPorCliente);
router.delete('/:id', pedidoController.eliminarPedido);

module.exports = router;
