const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwtUtils');
const Usuario = require('../models/usuarioModel');

const login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }
      const passwordMatch = await bcrypt.compare(senha, usuario.senha);
      console.log(passwordMatch)
    if (!passwordMatch) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }
      const token = generateToken({ id: usuario.id });
      
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
