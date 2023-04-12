const express = require('express');

const router = express.Router();
const { categoryController } = require('../controllers');
const validateJWT = require('../middlewares/validateJWT');

router.post('/', validateJWT, categoryController.registerCategory);
router.get('/', validateJWT, categoryController.listCategories);

module.exports = router;