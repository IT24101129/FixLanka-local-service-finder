import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProvider } from '../services/api';
import { calculateSmartMatch } from '../utils/matching';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { Star, MapPin, Briefcase, Calendar, Phone, ArrowLeft, Send, Sparkles, CheckCircle2 } from 'lucide-react';

const ProviderProfile = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProvider = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getProvider(id);
        setProvider(res.data);
      } catch (err) {
        setError(err.message || 'Failed to load provider profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [id]);

  if (loading) return <Loading message="Loading provider details & calculating Smart Match..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!provider) return <ErrorMessage message="Provider not found." />;

  // Calculate rule-based Smart Match
  const matchResult = calculateSmartMatch(provider, {
    service: provider.service,
    location: provider.location
  });

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      <Link to="/find-services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', marginBottom: '1.25rem', fontWeight: 500 }}>
        <ArrowLeft size={16} /> Back to Services
      </Link>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', marginBottom: '0.2rem' }}>{provider.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span className="provider-trade" style={{ fontSize: '0.9rem' }}>{provider.service}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>• Verified Local Trade</span>
            </div>
          </div>

          <div className="rating-badge" style={{ fontSize: '1.1rem', padding: '0.4rem 0.85rem' }}>
            <Star size={18} fill="#d97706" color="#d97706" />
            <span>{provider.rating ? provider.rating.toFixed(1) : '4.5'} / 5.0</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', padding: '1rem', background: 'var(--neutral-bg)', borderRadius: 'var(--radius-sm)', margin: '1.25rem 0' }}>
          <div className="meta-item">
            <MapPin size={18} style={{ color: 'var(--primary-emerald)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Location</div>
              <strong>{provider.location}</strong>
            </div>
          </div>

          <div className="meta-item">
            <Briefcase size={18} style={{ color: 'var(--text-muted)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Experience</div>
              <strong>{provider.experience}</strong>
            </div>
          </div>

          <div className="meta-item">
            <Calendar size={18} style={{ color: 'var(--accent-amber)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Availability</div>
              <strong>{provider.availability}</strong>
            </div>
          </div>

          <div className="meta-item">
            <Phone size={18} style={{ color: 'var(--text-muted)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Contact</div>
              <strong>{provider.phone}</strong>
            </div>
          </div>
        </div>

        <h3 style={{ marginBottom: '0.5rem' }}>About Provider</h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          {provider.description}
        </p>

        {/* Smart Match Recommendation Card */}
        <div className="smart-match-card">
          <div className="match-header">
            <div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-emerald)', fontWeight: 700, fontSize: '0.85rem' }}>
                <Sparkles size={16} /> Transparent Smart Match Score
              </span>
              <h3 style={{ margin: '0.2rem 0' }}>{matchResult.label}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Evaluated across trade match, Sri Lankan proximity, availability, and rating.
              </p>
            </div>
            <div className="match-score">{matchResult.score}%</div>
          </div>

          <div className="match-bar-container">
            <div className="match-bar-fill" style={{ width: `${matchResult.score}%` }}></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginTop: '1rem' }}>
            {matchResult.breakdown.map((item, idx) => (
              <div key={idx} style={{ background: 'white', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid #d1fae5', fontSize: '0.8rem' }}>
                <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{item.factor}</div>
                <div style={{ color: 'var(--primary-emerald)', fontWeight: 700 }}>+{item.points}/{item.max} Pts ({item.status})</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <Link to={`/request/${provider._id}`} className="btn btn-primary btn-full">
            <Send size={18} /> Request Service with {provider.name}
          </Link>
        </div>
      </div>
    </div>
  );
};


export default ProviderProfile;
