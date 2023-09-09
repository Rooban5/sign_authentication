const nodemailer = require("nodemailer");
const User = require("../models/SignupModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const SECRET = 'qwertyuioplkjhgfdszcvbnm,';
const CONFIG = require('../config/config'); // Import your configuration

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    // Generate a unique reset token for the user
    const resetToken = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1h' });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: "roobankr6@gmail.com",
         pass: "pfdwevxunzujxcmy",
      },
    });
    
    const mailOptions = {
      from: "roobankr6@gmail.com", // Update with your email
      to: email,
      subject: "Password Reset",
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent")
    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ message: "Failed to send reset email" });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify the reset token without querying the database
    const decodedToken = jwt.verify(token, SECRET);

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.accountLocked) {
      const now = new Date();
      if (user.lockUntil > now) {
        const remainingTime = Math.ceil((user.lockUntil - now) / 1000); // Convert to seconds
        console.log(`Account locked. Please try again after ${remainingTime} seconds.`);
        return res.status(401).json({ message: `Account locked. Please try again after ${remainingTime} seconds.` });
      } else {
        // Reset failed login attempts and unlock account
        user.failedLoginAttempts = 0;
        user.accountLocked = false;
        await user.save();
      }
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Reset failed login attempts on successful login
      user.failedLoginAttempts = 0;
      await user.save();

      

      const token = jwt.sign({ userId: user.id }, CONFIG.jwtSecret, {
        expiresIn: CONFIG.jwtExpiration,
      });
  
      console.log(token);

      // Extend responseData with additional user details
      const responseData = {
        token,
        username: user.username, // Send the admin's name in the response
        username1:user.username1,
        email: user.email,
        dob: user.dob, // Assuming 'dob' is a field in your User model
        gender: user.gender, // Assuming 'gender' is a field in your User model
        fullname: user.fullname, // Assuming 'fullname' is a field in your User model
        addedby: user.addedby, // Assuming 'fullname' is a field in your User model
      };

      res.json(responseData);
    } else {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= 3) {
        user.accountLocked = true;
        user.lockUntil = new Date(Date.now() + 10 * 1000); // Lock for 10 seconds
      }
      await user.save();

      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};