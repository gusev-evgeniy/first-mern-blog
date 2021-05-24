const express = require('express')

const {getPostsByTag} = require('../controllers/PostControllers')

const router = express.Router()

router.get('/search', getPostsByTag)

module.exports = router