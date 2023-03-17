require('dotenv').config();

const Sequelize = require('sequelize');
console.log(process.env)
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  define: {
    timestamps: false
  }
});

sequelize.authenticate().then(() => {
  console.log('Conexão com o banco de dados estabelecida com sucesso!');
}).catch((error) => {
  console.error('Não foi possível conectar ao banco de dados:', error);
});

module.exports = sequelize;
