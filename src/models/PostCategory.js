module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
    },
    {
        timestamps: false,
        tableName:'posts_categories',
        underscored: true,
    }
    )
    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category,
      { as: 'posts',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
     });
     models.Category.belongsToMany(models.BlogPost,
        { as: 'categories',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
       });
      };
    return PostCategory;
}
