const { BlogPost, User, Category} = require('../models');
// const Sequelize = require('sequelize');
// const config = require('../config/config')
// const env = process.env.NODE_ENV || 'development';
// const sequelize = new Sequelize(config[env]);

const listPosts = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: {exclude: 'password'} },
    { model: Category, as: 'categories', through: { attributes: [] } }
],
})

const getById = (id) => BlogPost.findAll({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: {exclude: 'password'} },
      { model: Category, as: 'categories', through: { attributes: [] } }
  ],
  })

// const createPosts = async (title, content, userId, categoryIds) => {
//       const result = await sequelize.transaction(async (t) => {
//       const posts = await BlogPost.create({
//         title,
//         content,
//         userId,
//         published: new Date(),
//         updated: new Date(),
//       }, { transaction: t });

//       await PostCategory.create({
//         postId: posts.id, categoryId: categoryIds
//       }, { transaction: t });
//       return posts;
//     });

//     return result;
// }

module.exports = {
    listPosts,
    getById,
    // createPosts,
}