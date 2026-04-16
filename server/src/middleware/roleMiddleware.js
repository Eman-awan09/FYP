// src/middleware/roleMiddleware.js

/**
 * Middleware factory for role-based access control.
 * Usage: router.get('/admin-only', authMiddleware, roleMiddleware(['ADMIN']), handler)
 */
const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated.' });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access forbidden for this role.' });
      }

      next();
    } catch (error) {
      console.error('roleMiddleware error:', error);
      return res.status(500).json({ message: 'Server error in role middleware.' });
    }
  };
};

module.exports = roleMiddleware;