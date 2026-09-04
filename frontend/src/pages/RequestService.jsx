import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import RequestForm from '../components/RequestForm';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getProvider, createRequest } from '../services/api';
import { CheckCircle2, ClipboardList, ArrowLeft, Wrench } from 'lucide-react';

const RequestService = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(!!providerId);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (providerId) {
      const fetchProvider = async () => {
        setLoading(true);
        try {
          const res = await getProvider(providerId);
          setProvider(res.data);
        } catch (err) {
          setError(err.message || 'Failed to load provider details');
        } finally {
          setLoading(false);
        }
      };
      fetchProvider();
    }
  }, [providerId]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await createRequest(formData);
      setSubmittedData(res.data);
    } catch (err) {
      setError(err.message || 'Failed to submit service request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading message="Loading provider details for request..." />;

  // Display Request Success Screen with Generated Request ID (FL-100X)
  if (submittedData) {
    return (
      <div style={{ maxWidth: '640px', margin: '2rem auto', textAlign: 'center' }}>
        <div className="card" style={{ padding: '2.5rem 2rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary-emerald-light)', color: 'var(--primary-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Service Request Created!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Your request has been successfully recorded in the FixLanka system.
          </p>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Your Tracking Request ID</span>
            <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary-emerald)', fontFamily: 'var(--font-heading)', margin: '0.25rem 0' }}>
              {submittedData.requestId || 'FL-1001'}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Service: <strong>{submittedData.service}</strong> • Location: <strong>{submittedData.location}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/my-requests" className="btn btn-primary">
              <ClipboardList size={18} /> View & Track Requests
            </Link>
            <Link to="/find-services" className="btn btn-secondary">
              Find More Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ maxWidth: '640px', margin: '0 auto 1.25rem auto' }}>
        <Link to="/find-services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          <ArrowLeft size={16} /> Back to Find Services
        </Link>
      </div>

      {error && <ErrorMessage message={error} />}

      <RequestForm
        initialProvider={provider}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
};

export default RequestService;
