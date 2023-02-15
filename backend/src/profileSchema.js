const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  dob: {
    type: String,
    required: [true, 'DOB is required']
  },
  zipcode: {
    type: Number,
    required: [true, 'zipcode is required']
  },
  followingList: {
    type: [String],
    required: [true, 'FollowingList is required']
  },
  status: {
    type: String,
    required: [true, 'Status Messag is required']
  },
  avatar: {
    type: Object,
    required: [true, 'Avatar string is required']
  }
})

module.exports = profileSchema;
