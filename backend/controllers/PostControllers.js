const asyncHandler = require('express-async-handler')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const Post = require('../models/PostModel')
const Comment = require('../models/CommentModel')
const Tag = require('../models/TagModel')

const getAllPosts = asyncHandler(async (req, res) => {
  try {
    let posts = await Post.find().sort([['created', '-1']]).populate('author', ['name', 'photo']).populate({
      path: 'reply',
      populate: {
        path: 'author',
        select: ['name', 'photo']
      }
    })

    res.json(posts)
  } catch (error) {
    res.status(400).json({ message: 'Something goes wrong' })
  }
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

const getPostsByTag = asyncHandler(async (req, res) => {
  try {
    let posts = await Post.find({ tags: req.query.tag }).sort([['created', '-1']]).populate('author', ['name', 'photo']).populate({
      path: 'reply',
      populate: {
        path: 'author',
        select: ['name', 'photo']
      }
    })
    res.json(posts)
  } catch (error) {
    res.status(400).json({ message: 'Something goes wrong' })
  }
})

const createNewPost = asyncHandler(async (req, res) => {
  let { body, replyPostId } = req.body
  const tags = body.split(' ').filter(word => word.startsWith('#') && word.length > 1).map(word => word.substring(1))

  try {
    const post = await Post.create({ body, tags, author: req.user.id, reply: replyPostId })
    await post.save()

    res.json(post)
  } catch (error) {
    res.status(400).json({ message: 'Something goes wrong' })
  }
})


const createNewPhotoPost = asyncHandler(async (req, res) => {
  const file = req.file
  console.log(file)
  if (!file) {
    return res.status(400).json({ message: 'Please choose files' })
  }

  let img = fs.readFileSync(file.path)

  encode_image = img.toString('base64')

  let finalImg = {
    filename: uuidv4() + '-' + file.originalname,
    contentType: file.mimetype,
    imageBase64: encode_image
  }

  let post = await Post.findById(req.params.id)
  post.image = finalImg
  await post.save()

  res.json(post)
})

const deletePost = asyncHandler(async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
    await Comment.deleteMany({ post: req.params.id })
    res.json({ message: 'Post delete' })
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
  deletePost,
  getPostsByTag,
  createNewPhotoPost
}