require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const User = require('./models/userModel');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();

// Middleware CORS
app.use(cors({
  origin: 'https://musical-tawny.vercel.app/',
  credentials: true,
}));

// Middleware para procesar JSON
app.use(express.json());

// Sincronizar la base de datos
sequelize.sync()
  .then(() => console.log('La base de datos ha sido sincronizada'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Middleware para verificar el token JWT en rutas privadas
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del encabezado

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Token no válido
      }
      req.user = user; // Guardar los datos del usuario verificado
      next();
    });
  } else {
    res.sendStatus(401); // Token no proporcionado
  }
};

// Usa el puerto definido en el archivo .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
