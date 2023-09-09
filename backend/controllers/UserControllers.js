const User = require('../models/SignupModel');
const bcrypt = require('bcryptjs');
const CONFIG = require('../config/config');
const jwt = require('jsonwebtoken');

exports.AdminAdduser = async (req, res) => {
  const { username, email, password, addedby } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      addedby: addedby + " admin" ,  
     });

    // Generate a JWT token with the user's ID as the payload
    const token = jwt.sign({ user_id: newUser._id }, CONFIG.jwtSecret, {
      expiresIn: CONFIG.jwtExpiration,
    });
    // console.log(token)
    await newUser.save();

    res.status(201).json({ message: 'Admin registered successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.getadminUserList = async (req, res) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};
