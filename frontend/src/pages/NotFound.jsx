import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="card" style={{ maxWidth: '520px', margin: '4rem auto', textAlign: 'center', padding: '3rem 2rem' }}>
      <AlertTriangle size={56} style={{ color: 'var(--accent-amber)', marginBottom: '1rem' }} />
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>404</h1>
      <h2 style={{ fontSize: '1.25rem', color: 'var(--secondary-navy)', marginBottom: '1rem' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        <Home size={18} /> Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
