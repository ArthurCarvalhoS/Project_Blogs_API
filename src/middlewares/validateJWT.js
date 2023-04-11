const jwt = require('jsonwebtoken');

const { userService } = require('../services');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');
      if (!token) {
          return res.status(401).json({ message: 'Token not found' });
      }
        try {
          const decoded = jwt.verify(token, secret);
          const user = await userService.getById(decoded.data.id);
          req.user = user;

          next();
        } catch (_error) {
          return res.status(401).json({ message: "Expired or invalid token" });
        }
      };