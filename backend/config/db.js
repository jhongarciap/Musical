// config/database.js
const { Sequelize } = require('sequelize');
const DB_NAME= 'dbmusical' ;
const DB_USER= 'admin';
const DB_PASS= 'rootroot';
const DB_HOST='dbmusical.ctciuwqyutqi.us-east-2.rds.amazonaws.com' ;
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
