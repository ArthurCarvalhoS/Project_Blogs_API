const { categoryService } = require('../services');

const listCategories = async (_req, res) => {
    const categories = await categoryService.listCategories();
    res.status(200).json(categories);
};
const registerCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: '"name" is required' });
    }
    const newCategory = await categoryService.createCategory(name);
    res.status(201).json(newCategory);
};
module.exports = {
    listCategories,
    registerCategory,
};