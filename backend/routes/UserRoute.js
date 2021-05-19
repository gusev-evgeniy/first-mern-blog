const express = require('express')
const { check } = require('express-validator')

const { createUser, getUser, auth, uploadPhoto, updateUser } = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/profile/signup', [
  check('name', 'User name not should be empty').notEmpty(),
  check('email', 'Should be email').isEmail(),
  check('password', 'Min lenght 6 symbols').isLength({ min: 8 })
], createUser)
router.post('/login', getUser)
router.put('/profile', authMiddleware, updateUser)
router.get('/auth', authMiddleware, auth)
router.put('/profile/photo', authMiddleware, uploadPhoto)


module.exports = router