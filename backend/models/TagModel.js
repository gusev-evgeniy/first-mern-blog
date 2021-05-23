const { Schema, model } = require('mongoose')

const TagSchame = new Schema({
  topTags: {
    type: Map,
    of: Number
  }
})

module.exports = model('Tag', TagSchame)