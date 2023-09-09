const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config'); // Import your configuration

module.exports.secureMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  console.log("authorizationHeader", authorizationHeader);

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Check if the header starts with "Bearer " (including the space)
  if (!authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  // Extract the token without the "Bearer " prefix
  const token = authorizationHeader.split(" ")[1];

  jwt.verify(token, CONFIG.jwtSecret, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(401).json({ message: 'Token verification failed' });
    }

    req.user = decoded;
    next();
  });
};
