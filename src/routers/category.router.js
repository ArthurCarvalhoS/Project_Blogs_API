const express = require('express');
const router = express.Router();
const { categoryController } = require('../controllers');
const validateJWT = require('../middlewares/validateJWT')

router.post('/', validateJWT, categoryController.registerCategory);

module.exports = router;