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
  deletePost,
  getPostsByBookmarks,
  getPostsBySubscriptions, addBookmarks,
  deleteBookmarks, getUserPosts } = require('../controllers/PostControllers')

const router = express.Router()

router.get('/posts/', getAllPosts)
router.get('/posts/:id', authMiddleware, getUserPosts)
router.get('/posts/Search', getPostsByTag)
router.get('/bookmarks', authMiddleware, getPostsByBookmarks)
router.get('/subscriptions', authMiddleware, getPostsBySubscriptions)
router.post('/post', [
  check('body', 'Body not should be empty').notEmpty(),
  authMiddleware
], createNewPost)
router.put('/post/image/:id', createNewPhotoPost)
router.delete('/post/:id', authMiddleware, deletePost)
router.get('/post/:id', getPost)
router.post('/post/:id/comment', authMiddleware, createNewComment)
router.put('/post/:id/like', authMiddleware, addLike)
router.delete('/post/:id/like', authMiddleware, deleteLike)
router.put('/post/:id/bookmarks', authMiddleware, addBookmarks)
router.delete('/post/:id/bookmarks', authMiddleware, deleteBookmarks)

module.exports = router