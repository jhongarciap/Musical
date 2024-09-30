require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/db'); // Tu conexión a MySQL
const User = require('./models/userModel');  
const authRoutes = require('./routes/authRoutes');  
const cors = require('cors');

const app = express();

// CORS setup
app.use(cors({
  origin: 'https://main.d3gn7cununfdbc.amplifyapp.com', // Cambia esto si es necesario
  credentials: true, // Permite enviar cookies
}));

// Middleware para procesar JSON
app.use(express.json());

// Configuración de express-session con SequelizeStore
const sessionStore = new SequelizeStore({
  db: sequelize, // Conexión a la base de datos
});

app.use(session({
  secret: 'dftz09122003', // Cambia esto por un valor seguro
  store: sessionStore,
  resave: false, // Evita guardar la sesión si no ha sido modificada
  saveUninitialized: false, // No guarda sesiones vacías
  cookie: {
    secure: true, // Solo en HTTPS
    httpOnly: true,
    sameSite: 'none',
  }
}));

// Sincronizar la base de datos para la tabla de sesiones
sessionStore.sync();

// Usa las rutas de autenticación
app.use('/api/auth', authRoutes);

// Sincronizar los modelos
sequelize.sync()
  .then(() => console.log('La base de datos y las tablas han sido sincronizadas'))
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

// Iniciar el servidor
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
