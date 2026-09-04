import React from 'react';

const Loading = ({ message = 'Loading FixLanka data...' }) => {
  return (
    <div className="loading-state">
      <div className="spinner"></div>
      <p style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{message}</p>
    </div>
  );
};


export default Loading;
