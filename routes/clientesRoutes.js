const express = require('express');
const router = express.Router();
const ClientesController = require('../controllers/clientesController');

router.get('/', ClientesController.listarClientes);
router.get('/calculaRotas', ClientesController.calculaRotas);
router.post('/', ClientesController.cadastrarCliente);

module.exports = router;