import React from 'react';
import { Search, Filter, MapPin, Wrench, Calendar, Star, RotateCcw } from 'lucide-react';

const SearchFilters = ({ filters, onFilterChange, onReset }) => {
  const handleInputChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="filter-panel">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
          <Filter size={18} style={{ color: 'var(--primary-emerald)' }} />
          Filter Service Providers
        </h3>
        <button onClick={onReset} className="btn btn-secondary btn-sm" style={{ padding: '0.25rem 0.6rem', fontSize: '0.8rem' }}>
          <RotateCcw size={14} /> Reset Filters
        </button>
      </div>

      <div className="filter-grid">
        {/* Search Query Input */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Search size={14} /> Search Keyword
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Search provider name, trade, description..."
            value={filters.search || ''}
            onChange={(e) => handleInputChange('search', e.target.value)}
          />
        </div>

        {/* Service Type Select */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Wrench size={14} /> Service Trade
          </label>
          <select
            className="form-select"
            value={filters.service || 'All'}
            onChange={(e) => handleInputChange('service', e.target.value)}
          >
            <option value="All">All Services</option>
            <option value="Electrician">Electrician</option>
            <option value="Plumber">Plumber</option>
            <option value="Mechanic">Mechanic</option>
            <option value="AC Technician">AC Technician</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Painter">Painter</option>
          </select>
        </div>

        {/* Location Select */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={14} /> Sri Lankan Location
          </label>
          <select
            className="form-select"
            value={filters.location || 'All'}
            onChange={(e) => handleInputChange('location', e.target.value)}
          >
            <option value="All">All Locations</option>
            <option value="Kandy">Kandy</option>
            <option value="Colombo">Colombo</option>
            <option value="Peradeniya">Peradeniya</option>
            <option value="Katugastota">Katugastota</option>
            <option value="Kundasale">Kundasale</option>
            <option value="Matale">Matale</option>
            <option value="Kurunegala">Kurunegala</option>
            <option value="Gampola">Gampola</option>
          </select>
        </div>

        {/* Availability Select */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Calendar size={14} /> Availability
          </label>
          <select
            className="form-select"
            value={filters.availability || 'All'}
            onChange={(e) => handleInputChange('availability', e.target.value)}
          >
            <option value="All">Any Availability</option>
            <option value="Available Today">Available Today</option>
            <option value="Available Tomorrow">Available Tomorrow</option>
            <option value="Weekend Only">Weekend Only</option>
          </select>
        </div>

        {/* Minimum Rating Select */}
        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Star size={14} /> Minimum Rating
          </label>
          <select
            className="form-select"
            value={filters.rating || 'All'}
            onChange={(e) => handleInputChange('rating', e.target.value)}
          >
            <option value="All">Any Rating</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.8">4.8+ Stars</option>
          </select>
        </div>
      </div>
    </div>
  );
};


export default SearchFilters;
