// index.js
require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const User = require('./models/userModel');  // Importa el modelo

const app = express();

// Middleware para procesar JSON
app.use(express.json());

// Sincroniza el modelo con la base de datos
sequelize.sync()
  .then(() => console.log('La base de datos y las tablas han sido sincronizadas'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

// Puerto del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
