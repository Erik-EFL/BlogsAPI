'use strict';
const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: 'Categories',
    timestamps: false,
  });
return Category;
};

module.exports = Category;
