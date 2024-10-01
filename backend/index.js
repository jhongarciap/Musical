require('dotenv').config();
const express = require('express');
const session = require('express-session'); 
const sequelize = require('./config/db');
const User = require('./models/userModel');  
const authRoutes = require('./routes/authRoutes');  

const app = express();

const cors = require('cors');
app.use(cors({
  origin: 'https://salmon-sea-0b585031e.5.azurestaticapps.net', // Cambia esto si es necesario
  credentials: true, // Permite enviar cookies
}));

// Middleware para procesar JSON
app.use(express.json());

// Configuración de express-session
app.use(session({
  secret: 'dftz09122003', // Cambia esto por un valor seguro
  cookie: {secure: true}
}));

// Usa las rutas de autenticación
app.use('/api/auth', authRoutes);  

// Sincroniza el modelo con la base de datos
sequelize.sync()
  .then(() => console.log('La base de datos y las tablas han sido sincronizadas'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
