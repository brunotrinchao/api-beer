const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Usuarios extends Model {}

Usuarios.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'usarios'
});

module.exports = Usuarios;
