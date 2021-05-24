const asyncHandler = require('express-async-handler')

const Post = require('../models/PostModel')

const getAllTags = asyncHandler(async (req, res) => {
  try {
    const tags = await Post.aggregate([
      { "$unwind": "$tags" },

      {
        "$group": {
          "_id": "$tags",
          "count": { "$sum": 1 }
        }
      },

      { "$sort": { "_id": -1 } },

      { "$limit": 5 }
    ])
    res.json(tags)
  } catch (e) {
    res.status(400).json({ "message": "Something goes wrong" })
  }
})

module.exports = { getAllTags }