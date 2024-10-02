const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  session_key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_pro: {  
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'Users',  // Especifica el nombre exacto de la tabla en la base de datos
  timestamps: true,    // Añade automáticamente createdAt y updatedAt
});
