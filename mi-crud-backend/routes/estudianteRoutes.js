const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/estudianteController');

router.post('/', ctrl.crear);
router.get('/', ctrl.listar);
router.put('/:id', ctrl.actualizar);
router.delete('/:id', ctrl.eliminar);

module.exports = router;