const { Category } = require('../models');

const createCategory = (name) => Category.create({ name });
const listCategories = () => Category.findAll();
const findCategories = (id) => Category.findAndCountAll({ where: { id } });

module.exports = {
    listCategories,
    createCategory,
    findCategories,
};