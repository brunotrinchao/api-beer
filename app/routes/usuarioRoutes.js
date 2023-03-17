const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware,usuarioController.createUsuario);
router.get('/', authMiddleware, usuarioController.getUsuario);
router.get('/:id', authMiddleware,usuarioController.getUsuarioById);
router.put('/:id', authMiddleware,usuarioController.updateUsuario);
router.delete('/:id', authMiddleware,usuarioController.deleteUsuario);

module.exports = router;
