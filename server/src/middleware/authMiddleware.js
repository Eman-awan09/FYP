// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to authenticate requests using JWT.
 * Attaches `req.user` if valid.
 */
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    if (!token) {
      return res.status(401).json({ message: 'No token provided. Authorization denied.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.userId).select('-passwordHash');
      if (!user) {
        return res.status(401).json({ message: 'User not found. Authorization denied.' });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error('JWT verification failed:', err.message);
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
  } catch (error) {
    console.error('authMiddleware error:', error);
    return res.status(500).json({ message: 'Server error in auth middleware.' });
  }
};

module.exports = authMiddleware;