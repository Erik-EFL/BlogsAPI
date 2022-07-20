'use strict';
const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content:  DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,

  },
  {
    timestamps: true,
    createdAt: 'published',
    updatedAt: 'updated',
  });
return BlogPost;
};

module.exports = BlogPost;
