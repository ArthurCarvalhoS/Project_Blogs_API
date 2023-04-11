const { Category } = require('../models');
const createCategory = (name) => Category.create({ name })
const listCategories = () => Category.findAll()

module.exports = {
    listCategories,
    createCategory,
}