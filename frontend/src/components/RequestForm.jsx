import React, { useState } from 'react';
import { validateServiceRequest } from '../utils/validation';
import { Send, AlertCircle, Calendar, Phone, User, MapPin, Wrench, FileText } from 'lucide-react';

const RequestForm = ({ initialProvider, onSubmit, submitting }) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    customerName: '',
    contactNumber: '',
    service: initialProvider ? initialProvider.service : 'Electrician',
    providerId: initialProvider ? initialProvider._id : '',
    providerName: initialProvider ? initialProvider.name : 'General Provider',
    location: initialProvider ? initialProvider.location : 'Kandy',
    problem: '',
    preferredDate: todayStr,
    urgency: 'Medium'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationResult = validateServiceRequest(formData);

    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ maxWidth: '640px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Wrench className="brand-icon" style={{ color: 'var(--primary-emerald)' }} />
        Submit Service Request
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Fill out your request details to receive an instant tracking ID.
      </p>

      {initialProvider && (
        <div style={{ background: 'var(--primary-emerald-light)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', border: '1px solid #a7f3d0' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--primary-emerald)' }}>Requesting Specific Provider</span>
          <h4 style={{ fontSize: '1.1rem', margin: '0.2rem 0' }}>{initialProvider.name}</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {initialProvider.service} • {initialProvider.location} • Rating: {initialProvider.rating} ★
          </p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {/* Customer Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="customerName">
            <User size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Customer Name *
          </label>
          <input
            id="customerName"
            type="text"
            name="customerName"
            className="form-input"
            placeholder="e.g. Anura Perera"
            value={formData.customerName}
            onChange={handleChange}
          />
          {errors.customerName && <span className="field-error">{errors.customerName}</span>}
        </div>

        {/* Contact Phone Number */}
        <div className="form-group">
          <label className="form-label" htmlFor="contactNumber">
            <Phone size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Phone Number *
          </label>
          <input
            id="contactNumber"
            type="text"
            name="contactNumber"
            className="form-input"
            placeholder="e.g. 0771234567"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          {errors.contactNumber && <span className="field-error">{errors.contactNumber}</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {/* Service Type */}
        <div className="form-group">
          <label className="form-label" htmlFor="service">
            <Wrench size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Service Trade *
          </label>
          <select
            id="service"
            name="service"
            className="form-select"
            value={formData.service}
            onChange={handleChange}
            disabled={!!initialProvider}
          >
            <option value="Electrician">Electrician</option>
            <option value="Plumber">Plumber</option>
            <option value="Mechanic">Mechanic</option>
            <option value="AC Technician">AC Technician</option>
            <option value="Carpenter">Carpenter</option>
            <option value="Painter">Painter</option>
          </select>
          {errors.service && <span className="field-error">{errors.service}</span>}
        </div>

        {/* Location */}
        <div className="form-group">
          <label className="form-label" htmlFor="location">
            <MapPin size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Location *
          </label>
          <select
            id="location"
            name="location"
            className="form-select"
            value={formData.location}
            onChange={handleChange}
          >
            <option value="Kandy">Kandy</option>
            <option value="Colombo">Colombo</option>
            <option value="Peradeniya">Peradeniya</option>
            <option value="Katugastota">Katugastota</option>
            <option value="Kundasale">Kundasale</option>
            <option value="Matale">Matale</option>
            <option value="Kurunegala">Kurunegala</option>
            <option value="Gampola">Gampola</option>
          </select>
          {errors.location && <span className="field-error">{errors.location}</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {/* Preferred Date */}
        <div className="form-group">
          <label className="form-label" htmlFor="preferredDate">
            <Calendar size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Preferred Date *
          </label>
          <input
            id="preferredDate"
            type="date"
            name="preferredDate"
            className="form-input"
            min={todayStr}
            value={formData.preferredDate}
            onChange={handleChange}
          />
          {errors.preferredDate && <span className="field-error">{errors.preferredDate}</span>}
        </div>

        {/* Urgency */}
        <div className="form-group">
          <label className="form-label" htmlFor="urgency">Urgency Level *</label>
          <select
            id="urgency"
            name="urgency"
            className="form-select"
            value={formData.urgency}
            onChange={handleChange}
          >
            <option value="Low">Low - Within a week</option>
            <option value="Medium">Medium - Next 1-2 days</option>
            <option value="High">High - Emergency / Today</option>
          </select>
          {errors.urgency && <span className="field-error">{errors.urgency}</span>}
        </div>
      </div>

      {/* Problem Description */}
      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
        <label className="form-label" htmlFor="problem">
          <FileText size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
          Describe Problem / Details *
        </label>
        <textarea
          id="problem"
          name="problem"
          className="form-textarea"
          rows={4}
          placeholder="Please describe what needs repair or servicing in detail..."
          value={formData.problem}
          onChange={handleChange}
        ></textarea>
        {errors.problem && <span className="field-error">{errors.problem}</span>}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-full"
        disabled={submitting}
      >
        <Send size={18} />
        {submitting ? 'Submitting Request...' : 'Submit Service Request'}
      </button>
    </form>
  );
};


export default RequestForm;
