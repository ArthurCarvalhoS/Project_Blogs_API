const express = require('express');

const router = express.Router();
const { userController } = require('../controllers');
const validateJWT = require('../middlewares/validateJWT');

router.post('/', userController.registerUser);
router.get('/', validateJWT, userController.listUsers);
router.get('/:id', validateJWT, userController.getUserById);
// router.delete('/me', validateJWT, userController.deleteUser);

module.exports = router;