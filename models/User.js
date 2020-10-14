const mongoose = require('mongoose');
const { isEmail,isEmpty } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ["CUSTOMER","AGENT","ADMIN"], 
  },
  loans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'loan'
  }]
});

 
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
 

const User = mongoose.model('user', userSchema);

module.exports = User;