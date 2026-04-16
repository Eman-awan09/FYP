// src/utils/generateToken.js
const jwt = require('jsonwebtoken');

/**
 * Generates a signed JWT containing at least userId and role.
 */
const generateToken = (user) => {
  const payload = {
    userId: user._id,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = generateToken;