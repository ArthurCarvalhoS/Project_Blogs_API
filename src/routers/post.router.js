const express = require('express');
const router = express.Router();
const { postController } = require('../controllers');
const validateJWT = require('../middlewares/validateJWT')

router.get('/', validateJWT, postController.listAll);
// router.post('/', validateJWT, postController.registerPost);

module.exports = router;