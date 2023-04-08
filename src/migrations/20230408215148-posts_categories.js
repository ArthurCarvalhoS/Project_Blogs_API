'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', { 
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field:'post_id',
      references:{
        model:'blog_posts',
        key: 'id'
      },
      primaryKey: true
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field:'category_id',
      references:{
        model:'blog_posts',
        key: 'id'
      },
      primaryKey: true
    },
  })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('posts_categories');

  }
};
