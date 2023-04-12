const express = require('express');
const router = express.Router();
const { postController } = require('../controllers');
const validateJWT = require('../middlewares/validateJWT')

router.get('/', validateJWT, postController.listAll);
router.get('/:id', validateJWT, postController.listById);
router.put('/:id', validateJWT, postController.updatePost);
// router.post('/', validateJWT, postController.registerPost);

module.exports = router;