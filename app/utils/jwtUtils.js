const jwt = require('jsonwebtoken');

const JWT_SECRET = 'mysecret'; // Chave secreta para assinar o token JWT

// Função para gerar o token JWT
const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, JWT_SECRET, options);
}

// Função para verificar se o token JWT é válido
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

module.exports = { generateToken, verifyToken };
