const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const User = require('../models/UserModel')
const { jwtSecret } = require('../confige/confige')

const createUser = asyncHandler(async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Incorrect request', errors })
    }

    const { name, email, password } = req.body
    const existUser = await User.findOne({ email })

    if (existUser) {
      return res.status(401).json({ message: 'A user with this email already exists' })
    }

    const hashPassword = await bcrypt.hash(password, 12)

    const newUser = await new User({
      name, email, password: hashPassword
    })
    await newUser.save()

    res.json({ message: 'Success' })

  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: 'Something gone wrong' })
  }
})

const auth = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).populate('posts')
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '24h' })

    return res.json({
      token,
      user
    })

  } catch (error) {
    req.status(400).json({ message: 'Something went wrong' })
  }
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Incorrect Email' })
    }

    const doMatch = await bcrypt.compare(password, user.password)

    if (!doMatch) {
      return res.status(401).json({ message: 'Incorrect Password' })
    }
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '24h' })
    res.json({
      token,
      user
    })
  } catch (error) {
    req.status(400).json({ message: 'Something went wrong' })
  }
})

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User
      .findById(req.params.id)
      .populate('post')
    res.json(user)
  } catch (error) {
    req.status(400).json({ message: 'Something goes wrong' })
  }
})

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().select(['name', 'photo', 'bio', 'subscriptions'])

    res.json(users)
  } catch (error) {
    req.status(400).json({ message: 'Something goes wrong' })
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const { bio, website, location } = req.body

  try {
    const user = await User.findById(req.user.id)
    user.bio = bio.trim() || user.bio,
      user.website = website.trim() || user.website,
      user.location = location.trim() || user.location

    await user.save()

    res.json({ user })
  } catch (error) {
    req.status(400).json({ message: 'Something went wrong' })
  }
})

const subscribe = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    user.subscriptions.push(req.params.id)
    await user.save()

    res.json({ message: 'Success' })
  } catch (error) {
    req.status(400).json({ message: 'Something goes wrong' })
  }
})

const unsubscribe = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    user.subscriptions.remove(req.params.id)
    await user.save()

    res.json({ message: 'Success' })
  } catch (error) {
    req.status(400).json({ message: 'Something goes wrong' })
  }
})

const uploadPhoto = asyncHandler(async (req, res) => {
  const file = req.file

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

  let user = await User.findById(req.user.id)
  user.photo = finalImg
  await user.save()

  res.json({ user })
});

module.exports = {
  createUser, getUser, auth, uploadPhoto, updateUser, login, subscribe, unsubscribe, getUsers
}