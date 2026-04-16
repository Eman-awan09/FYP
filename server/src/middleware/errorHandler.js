// src/middleware/errorHandler.js

/**
 * Global error handling middleware.
 * Make sure this is used after all routes in app.js
 */
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled error:', err);

  const statusCode = err.statusCode || 500;
  const message =
    err.message || 'An unexpected server error occurred. Please try again later.';

  res.status(statusCode).json({
    message,
  });
};

module.exports = errorHandler;