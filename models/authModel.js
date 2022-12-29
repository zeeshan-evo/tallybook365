const mongoose = require('mongoose')
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide a name']
  },
  email: {
    type: String,
    required: [true, 'please provide an email'],
    unique: [true, 'email needs to be unique'],
    validate: {
      validator: isEmail,
      message: 'please provide a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'please prvoide a password'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  user_id: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('User', UserSchema)