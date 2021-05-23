const { Schema } = require('mongoose')

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

module.exports = { PhotoSchema }
