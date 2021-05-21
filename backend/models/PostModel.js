const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
  body: {
    type: String,
    require: true
  },
  tags: {
    type: [String]
  },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  likes: [Schema.Types.ObjectId],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('Post', PostSchema)


