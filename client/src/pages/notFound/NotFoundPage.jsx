// src/pages/notFound/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ padding: '40px' }}>
      <h2>404 - Page not found</h2>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default NotFoundPage;