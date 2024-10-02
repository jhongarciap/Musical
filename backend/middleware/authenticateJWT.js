const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtener el token de la cabecera

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token no válido' });
      }
      req.user = user; // Asignar el usuario al request
      next();
    });
  } else {
    res.status(401).json({ message: 'No se ha proporcionado un token' });
  }
};

module.exports = authenticateJWT;
