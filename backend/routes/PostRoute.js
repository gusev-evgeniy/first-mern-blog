const express = require('express')
const { check } = require('express-validator')

const authMiddleware = require('../middleware/authMiddleware')
const { getPost,
  createNewPhotoPost,
  createNewComment,
  addLike,
  deleteLike,
  getAllPosts,
  createNewPost,
  getPostsByTag,
  deletePost } = require('../controllers/PostControllers')

const router = express.Router()

router.get('/posts', getAllPosts)
router.get('/posts/search', getPostsByTag)
router.post('/post', [
  check('title', 'Title not should be empty').notEmpty(),
  check('body', 'Body not should be empty').notEmpty(),
  authMiddleware
], createNewPost)
router.post('/post/image', createNewPhotoPost)
router.delete('/post/:id', authMiddleware, deletePost)
router.get('/post/:id', getPost)
router.post('/post/:id/comment', authMiddleware, createNewComment)
router.put('/post/:id/like', authMiddleware, addLike)
router.delete('/post/:id/like', authMiddleware, deleteLike)

module.exports = router