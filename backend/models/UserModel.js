const { Schema, model } = require('mongoose')

const PhotoSchema = new Schema({
  filename: {
    type: String
  },
  contentType: {
    type: String
  },
  imageBase64: {
    type: String
  }
})

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
  }
})

module.exports = model('User', UserSchema)