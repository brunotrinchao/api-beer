const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class People extends Model {}

People.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'people'
});

module.exports = People;
