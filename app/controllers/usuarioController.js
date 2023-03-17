const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');


exports.createUsuario = async (req, res, next) => {
  try {
     const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'Usuario created successfully!', usuario });
  } catch (error) {
    next(error);
  }
};

exports.getUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findAll();
    res.status(200).json({
      message: 'Usuario fetched!',
      count: usuario.length,
      data: usuario.map((usuario) => {
        return {
          id: usuario.id,
          name: usuario.name,
          email: usuario.email,
          request: {
            type: 'GET',
            url: `${process.env.BASE_URL}/usuario/${usuario.id}`,
          },
        };
      }),
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsuarioById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      const error = new Error('Usuario not found!');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: 'Usuario fetched!',
      data: {
        id: usuario.id,
        name: usuario.name,
        email: usuario.email,
        request: {
          type: 'GET',
          url: `${process.env.BASE_URL}/usuario/${usuario.id}`,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { id } });
    if (!usuario) {
      const error = new Error('Usuario not found!');
      error.statusCode = 404;
      throw error;
    }
    usuario.name = name;
    usuario.email = email;
    usuario.password = await bcrypt.hash(password, 10);
    await usuario.save();
    res.status(200).json({ message: 'Usuario updated!', usuario });
  } catch (error) {
    next(error);
  }
};

exports.deleteUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      const error = new Error('Usuario not found!');
      error.statusCode = 404;
      throw error;
    }
    await usuario.destroy();
    res.status(200).json({ message: 'Usuario deleted!' });
  } catch (error) {
    next(error);
  }
};

