const { User } = require('../models');
const getByEmail = async (email) => await User.findOne({ where: {email} });

module.exports = {
    getByEmail,
}