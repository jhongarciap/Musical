// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definir el modelo de Usuario
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  session_key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',  // Nombre de la tabla en la base de datos
});

module.exports = User;
