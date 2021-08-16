import React from 'react';
import '../styles/notFound.css';
import error from '../images/error404.png';

const NotFound = () => (
  <div className="not-found-page">
    <div className="error">
      <img src={ error } alt="error 404" />
    </div>
  </div>
);

export default NotFound;
