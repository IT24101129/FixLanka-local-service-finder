import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Briefcase, Calendar, Phone, ArrowRight } from 'lucide-react';

const ProviderCard = ({ provider }) => {
  if (!provider) return null;

  return (
    <div className="provider-card">
      <div>
        <div className="provider-header">
          <div>
            <h3 className="provider-name">{provider.name}</h3>
            <span className="provider-trade">{provider.service}</span>
          </div>
          <div className="rating-badge">
            <Star size={14} fill="#d97706" color="#d97706" />
            <span>{provider.rating ? provider.rating.toFixed(1) : '4.5'}</span>
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.75rem 0', minHeight: '2.7em' }}>
          {provider.description && provider.description.length > 95
            ? `${provider.description.substring(0, 95)}...`
            : provider.description}
        </p>

        <div className="provider-meta">
          <div className="meta-item">
            <MapPin size={16} style={{ color: 'var(--primary-emerald)' }} />
            <span>{provider.location}</span>
          </div>
          <div className="meta-item">
            <Briefcase size={16} style={{ color: 'var(--text-muted)' }} />
            <span>Experience: {provider.experience}</span>
          </div>
          <div className="meta-item">
            <Calendar size={16} style={{ color: 'var(--accent-amber)' }} />
            <span>{provider.availability}</span>
          </div>
          <div className="meta-item">
            <Phone size={16} style={{ color: 'var(--text-muted)' }} />
            <span>{provider.phone}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
        <Link to={`/providers/${provider._id}`} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
          View Profile
        </Link>
        <Link to={`/request/${provider._id}`} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
          Request Service
        </Link>
      </div>
    </div>
  );
};

export default ProviderCard;
