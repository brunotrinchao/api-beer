const jwtUtils = require('../utils/jwtUtils');
const UsuarioModel = require('../models/usuarioModel');

const authMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme != 'Bearer') {
    return res.status(401).json({ message: 'Token malformatted' });
  }

  try {
    const decoded = await jwtUtils.verifyToken(token);
    const user = await UsuarioModel.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: err.message });
  }
}

module.exports = authMiddleware;
