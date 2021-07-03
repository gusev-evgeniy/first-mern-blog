const express = require('express')
const { check } = require('express-validator')

const { createUser, getUser, auth, uploadPhoto, updateUser, login, subscribe, unsubscribe, getUsers } = require('../controllers/UserController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/profile/signup', [
  check('name', 'User name not should be empty').notEmpty(),
  check('email', 'Should be email').isEmail(),
  check('password', 'Min lenght 6 symbols').isLength({ min: 8 })
], createUser)
router.post('/login', login)
router.get('/profile/:id', getUser)
router.get('/users', getUsers)
router.put('/profile', authMiddleware, updateUser)
router.get('/auth', authMiddleware, auth)
router.put('/profile/photo', authMiddleware, uploadPhoto)
router.put('/profile/subscribe/:id', authMiddleware, subscribe)
router.delete('/profile/subscribe/:id', authMiddleware, unsubscribe)

module.exports = router