import React from 'react';

function Loader({ message = 'Loading Data...' }) {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loader-text">{message}</p>
    </div>
  );
}

export default Loader;
