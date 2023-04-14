const express = require('express');

const router = express.Router();
const { postController } = require('../controllers');
const validateJWT = require('../middlewares/validateJWT');

router.get('/', validateJWT, postController.listAll);
router.get('/search', validateJWT, postController.listBySearch);
router.get('/:id', validateJWT, postController.listById);
router.put('/:id', validateJWT, postController.updatePost);
router.post('/', validateJWT, postController.registerPost);
router.delete('/:id', validateJWT, postController.deletePost);

module.exports = router;