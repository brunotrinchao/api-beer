const express = require('express');
const database = require('./config/database');

const app = express();

// Importar o middleware
const errorMiddleware = require('./middlewares/errorMiddleware');

// CONSTANTES
const PORT = 3000;

app.use(express.json());

//  People
const peopleRoutes = require('./routes/peopleRoutes');
app.use('/people', peopleRoutes);
//  Usuario
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/usuario', usuarioRoutes);
//  Login
const loginRoutes = require('./routes/loginRoutes');
app.use('/login', loginRoutes);

// Adicionar o middleware na cadeia
app.use(errorMiddleware);

//inicia o servidor
database.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Servidor iniciado na porta 3000');
  });
}).catch((error) => {
  console.error('Erro ao sincronizar com o banco de dados:', error);
});
