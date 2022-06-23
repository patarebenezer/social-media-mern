var express = require('express');
const { index, createPost, updatePost, deletePost, likePost, getPostsBySearch, getPostDetail } = require('./controller');
var router = express.Router();
const { auth } = require('../../middleware/auth')

/* GET users listing. */
router.get('/', index);
router.get('/:id', getPostDetail);
router.post('/', auth, createPost)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likepost', auth, likePost)
router.get('/search', getPostsBySearch);

module.exports = router;
