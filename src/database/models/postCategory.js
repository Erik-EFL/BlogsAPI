'use strict'

/** @param {import('sequelize').Sequelize} sequelize */
const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
  }, {
    timestamps: false,
  })

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      /* Através da tabela atual */
      through: 'PostCategory',
      /* Nome da tabela de associação */
      foreignKey: 'postId',
      /* Nome da segunda tabela de associação */
      otherKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      /* Através da tabela atual */
      through: 'PostCategory',
      /* Nome da tabela de associação */
      foreignKey: 'categoryId',
      /* Nome da segunda tabela de associação */
      otherKey: 'postId',
    });
  }
  return PostCategory;
};

module.exports = PostCategory;
