const { User } = require('../models');
const createUser = (displayName, email, password) => User.create({ display_name: displayName, email, password });
const getByEmail = async (email) => await User.findOne({ where: {email} });
    
module.exports = {
    createUser,
    getByEmail,
}