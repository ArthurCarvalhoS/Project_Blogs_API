const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = (userInfo) => {
const jwtConfig = {
        algorithm:'HS256',
    }
    const token = jwt.sign({ data: { id: userInfo.id } }, secret, jwtConfig)
    return token;
}