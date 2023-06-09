const Sequelize = require('sequelize');
const { BlogPost, User, Category } = require('../models');

const { Op } = Sequelize;
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const listPosts = () => BlogPost.findAll({
  include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } },
],
});

const getById = (id) => BlogPost.findAll({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  });

  const getBySearch = async (q) => {
    const byTitle = await BlogPost.findAll({
      where: { title: { [Op.like]: q } },
      include: [
        { model: User, as: 'user', attributes: { exclude: 'password' } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (byTitle.length === 0) {
      const byContent = await BlogPost.findAll({
        where: { content: { [Op.like]: q } },
        include: [
          { model: User, as: 'user', attributes: { exclude: 'password' } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      });
      return byContent;
    }
    return byTitle;
  };

  const update = (id, title, content) => BlogPost.update({ title, content }, { where: { id } });
  const deleted = (id) => BlogPost.destroy({ where: { id } });

const createPosts = async (title, content, userId, categoryIds) => {
      const result = await sequelize.transaction(async (t) => {
      const posts = await BlogPost.create({
        title,
        content,
        userId,
        published: new Date(),
        updated: new Date(),
      }, { transaction: t });

      await posts.addCategories(categoryIds, { transaction: t });
      return posts;
    });

    return result;
};

module.exports = {
    listPosts,
    getById,
    getBySearch,
    update,
    createPosts,
    deleted,
};