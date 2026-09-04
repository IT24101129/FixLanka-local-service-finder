import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message = 'An unexpected error occurred.', onRetry }) => {
  return (
    <div className="error-state">
      <AlertCircle size={40} style={{ color: 'var(--danger)', marginBottom: '0.75rem' }} />
      <h3 style={{ marginBottom: '0.5rem', color: 'var(--danger)' }}>Unable to Load Data</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
        {message}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-secondary btn-sm">
          <RefreshCw size={16} /> Retry
        </button>
      )}
    </div>
  );
};


export default ErrorMessage;
