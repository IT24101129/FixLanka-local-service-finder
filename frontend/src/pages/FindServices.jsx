import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchFilters from '../components/SearchFilters';
import ProviderCard from '../components/ProviderCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getProviders } from '../services/api';
import { SearchX, Wrench } from 'lucide-react';

const FindServices = () => {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    service: searchParams.get('service') || 'All',
    location: searchParams.get('location') || 'All',
    availability: searchParams.get('availability') || 'All',
    rating: searchParams.get('rating') || 'All'
  });

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProviderData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProviders(filters);
      setProviders(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch service providers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviderData();
  }, [filters]);

  const handleReset = () => {
    setFilters({
      search: '',
      service: 'All',
      location: 'All',
      availability: 'All',
      rating: 'All'
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Wrench size={28} style={{ color: 'var(--primary-emerald)' }} />
          Find Local Service Providers
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Browse verified Sri Lankan electricians, plumbers, mechanics, and technicians.
        </p>
      </div>

      {/* Filters Control Panel */}
      <SearchFilters
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleReset}
      />

      {/* Content Results */}
      {loading ? (
        <Loading message="Searching Sri Lankan service providers..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchProviderData} />
      ) : providers.length === 0 ? (
        <div className="empty-state">
          <SearchX size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No providers found matching your criteria</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            Try adjusting your search keywords, location selection, or resetting filters.
          </p>
          <button onClick={handleReset} className="btn btn-secondary btn-sm">
            Reset All Filters
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
            Showing {providers.length} provider{providers.length > 1 ? 's' : ''} in Sri Lanka
          </div>
          <div className="provider-grid">
            {providers.map((provider) => (
              <ProviderCard key={provider._id} provider={provider} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FindServices;
