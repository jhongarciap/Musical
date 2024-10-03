// config/database.js
const { Sequelize } = require('sequelize');
const DB_NAME = 'bjhtjgrkhzkxtt5lmea1'; // Nombre de la base de datos
const DB_USER = 'usfy8glqtde9q4hc'; // Usuario de la base de datos
const DB_PASS = 'j5cZP6qW0J33Y1UslxJP'; // Contraseña de la base de datos
const DB_HOST = 'bjhtjgrkhzkxtt5lmea1-mysql.services.clever-cloud.com'; // Host de la base de datos

// Conectar a MySQL usando Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
});

console.log('Intentando conectar a la base de datos...');
sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

module.exports = sequelize;
