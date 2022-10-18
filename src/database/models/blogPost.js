'use strict';
const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.STRING,
      foreignKey: true
    },
    published: {
      type: DataTypes.DATE,
    },
    updated: {
      type: DataTypes.DATE,
    },
  }, {
    createdAt: 'published',
    updatedAt: 'updated',
    tableName: 'BlogPosts',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  }

  return BlogPost;
};

module.exports = BlogPost;
