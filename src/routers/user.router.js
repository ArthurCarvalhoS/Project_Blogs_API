const { userController } = require('../controllers');
const express = require('express');
const router = express.Router();
const validateJWT = require('../middlewares/validateJWT')

router.post('/', userController.registerUser);
router.get('/', validateJWT, userController.listUsers);

module.exports = router;