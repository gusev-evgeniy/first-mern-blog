const express = require('express')

const {getAllTags} = require('../controllers/TagControllers')

const router = express.Router()

router.get('/tags', getAllTags)

module.exports = router