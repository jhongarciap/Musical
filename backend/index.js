require('dotenv').config();
const express = require('express');
const session = require('express-session'); 
const cookieParser = require('cookie-parser'); // Importa cookie-parser
const sequelize = require('./config/db');
const User = require('./models/userModel');  
const authRoutes = require('./routes/authRoutes');  

const app = express();

const cors = require('cors');
app.use(cors({
  origin: 'https://main.d3swbnx2em39af.amplifyapp.com', // Cambia esto si es necesario
  credentials: true, // Permite enviar cookies
}));

// Usa cookie-parser para manejar cookies
app.use(cookieParser());

// Middleware para procesar JSON
app.use(express.json());

// Configuración de express-session
app.use(session({
  secret: 'dftz09122003', // Cambia esto por un valor seguro
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: true, 
    sameSite: 'none', // Permite compartir cookies entre dominios
    httpOnly: true,
    maxAge: 360000, 
  },
}));

// Usa las rutas de autenticación
app.use('/api/auth', authRoutes);  

// Sincroniza el modelo con la base de datos
sequelize.sync()
  .then(() => console.log('La base de datos y las tablas han sido sincronizadas'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

// Puerto del servidor
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
