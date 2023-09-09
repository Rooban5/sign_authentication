const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: String,
  // username1:String,
  email: String,
  password: String,
  fullname: String,
  dob: String,
  gender: String,
  addedby: String,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  failedLoginAttempts: {
    type: Number,
    default: 0,
  },
  accountLocked: {
    type: Boolean,
    default: false,
  },
  lockUntil: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function () {
  if (this.isAdmin) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});



module.exports = mongoose.model('User', userSchema);
