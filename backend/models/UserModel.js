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
  date: {
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
  subscriptions: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }
})

UserSchema.set('toJSON', {
  transform: function (_, obj) {
    delete obj.password;
    return obj;
  },
})

module.exports = model('User', UserSchema)