const { Schema, model } = require('mongoose')

const PostSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  body: {
    type: String,
    require: true
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


