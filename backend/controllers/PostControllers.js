const asyncHandler = require('express-async-handler')

const Post = require('../models/PostModel')
const Comment = require('../models/CommentModel')

const getAllPosts = asyncHandler(async (req, res) => {
  let posts = await Post.find().populate('author', ['name', 'photo'])
  res.json(posts)
})

const getPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post
      .findById(req.params.id)
      .populate('author', ['name', 'photo']).populate({
        path: 'comments',
        populate: { path: 'author', select: ['name', 'photo'] }
      })
    res.json(post)
  } catch (error) {
    res.status(400).json({ message: 'Something goes wrong' })
  }
})

const createNewPost = asyncHandler(async (req, res) => {
  const { title, body } = req.body
  try {
    const tags = body.split(' ').filter(word => word.startsWith('#'))
    const post = await Post.create({ body, tags, author: req.user.id })
    await post.save()

    res.json({ message: 'FullPost was created' })
  } catch (error) {
    res.status(400).json({ message: 'Something goes wrong' })
  }
})

const deletePost = asyncHandler(async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
    await Comment.deleteMany({ post: req.params.id })
    res.json({ message: 'FullPost delete' })
  } catch (error) {
    res.status(400).json({ message: 'Something goes wrong' })
  }
})

const createNewComment = asyncHandler(async (req, res) => {
  const { body } = req.body

  try {
    const comment = new Comment({ body, author: req.user.id, post: req.params.id })
    await comment.save()

    let post = await Post.findById(req.params.id)
    post.comments.push(comment._id)
    await post.save()

    res.json({ message: 'Message added' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Something went wrong' })
  }
})

const addLike = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    post.likes.push(req.user.id)
    await post.save()

    res.json({ likes: post.likes })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' })
  }
})

const deleteLike = asyncHandler(async (req, res) => {
  try {
    let post = await Post.findById(req.params.id)

    post.likes.remove(req.user.id)
    await post.save()

    res.json({ likes: post.likes })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' })
  }
})

module.exports = {
  getPost,
  createNewComment,
  addLike,
  deleteLike,
  getAllPosts,
  createNewPost,
  deletePost
}