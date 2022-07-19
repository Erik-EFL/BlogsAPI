'use strict';
const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    tableName: 'Users',
    timestamps: false,
  });

/*   User.associate = (models) => {
    User.hasMany(models.BlogPost, { key: 'userId', as: 'BlogPosts' });
  }; */

  return User;
};

module.exports = User;
