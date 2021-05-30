const { Schema, model } = require('mongoose')

const { PhotoSchema } = require('./PhotoSchema')

const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  data: {
    type: Date,
    default: Date.now
  },
  photo: PhotoSchema,
  website: {
    type: String,
  },
  bio: {
    type: String,
  },
  location: {
    type: String
  },
  tweets: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
  },
  bookmarks: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
  }
})

module.exports = model('User', UserSchema)