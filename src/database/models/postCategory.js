/** @param {import('sequelize').Sequelize} sequelize */
const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      primaryKey: true,
      references: {
        model: 'BlogPost',
        key: 'id',
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      primaryKey: true,
      references: {
        model: 'Category',
        key: 'id',
      }
    },
  }, {
    timestamps: false,
  })

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPost',
      /* Através da tabela atual */
      through: 'PostCategory',
      /* Nome da tabela de associação */
      foreignKey: 'categoryId',
      /* Nome da segunda tabela de associação */
      otherKey: 'postId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'Category',
      /* Através da tabela atual */
      through: 'PostCategory',
      /* Nome da tabela de associação */
      foreignKey: 'postId',
      /* Nome da segunda tabela de associação */
      otherKey: 'categoryId',
    });
  }
  return PostCategory;
};

module.exports = PostCategory;
