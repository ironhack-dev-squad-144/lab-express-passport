const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String},
  password: String,
  profilePicture: String,
  githubUsername: String,
  profileUrl: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
