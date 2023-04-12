const { User } = require('../models');

const createUser = (displayName, email, password) => {
    User.create({ displayName, email, password });
};
const getByEmail = (email) => User.findOne({ where: { email } });
const getUsers = () => User.findAll({ 
    attributes: { exclude: 'password' },
});
const getById = (userId) => User.findOne({
    where: { id: userId },
    attributes: { exclude: 'password' },
});

// const deleted = (userId) => User.destroy({ where: {id: userId}, as: 'user'})

module.exports = {
    createUser,
    getByEmail,
    getUsers,
    getById,
    // deleted
};