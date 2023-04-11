const { User } = require('../models');
const createUser = (displayName, email, password) => User.create({ display_name: displayName, email, password });
const getByEmail = async (email) => await User.findOne({ where: {email} });
const getUsers = () => User.findAll({ 
    attributes: {exclude:'password'},
});
const getById = (userId) => User.findOne({
    where: {id: userId},
    attributes: {exclude:'password'},
});

    
module.exports = {
    createUser,
    getByEmail,
    getUsers,
    getById
}