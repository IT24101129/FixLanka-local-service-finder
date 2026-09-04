import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRequests, updateRequestStatus, deleteRequest } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { ClipboardList, RefreshCw, Trash2, Calendar, Phone, MapPin, Tag, Wrench, AlertCircle, Plus } from 'lucide-react';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchRequestList = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getRequests();
      setRequests(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch your service requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestList();
  }, []);

  const handleStatusChange = async (requestId, newStatus) => {
    setActionLoading(requestId);
    try {
      await updateRequestStatus(requestId, newStatus);
      setRequests((prev) =>
        prev.map((req) => (req._id === requestId ? { ...req, status: newStatus } : req))
      );
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (requestId) => {
    if (!window.confirm('Are you sure you want to cancel and delete this service request?')) {
      return;
    }
    setActionLoading(requestId);
    try {
      await deleteRequest(requestId);
      setRequests((prev) => prev.filter((req) => req._id !== requestId));
    } catch (err) {
      alert(`Failed to delete request: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ClipboardList size={28} style={{ color: 'var(--primary-emerald)' }} />
            My Service Requests
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Track the status of your submitted service requests across Sri Lanka.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={fetchRequestList} className="btn btn-secondary btn-sm">
            <RefreshCw size={16} /> Refresh List
          </button>
          <Link to="/find-services" className="btn btn-primary btn-sm">
            <Plus size={16} /> New Request
          </Link>
        </div>
      </div>

      {loading ? (
        <Loading message="Loading submitted service requests..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchRequestList} />
      ) : requests.length === 0 ? (
        <div className="empty-state">
          <ClipboardList size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No service requests found</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            You haven't submitted any service requests yet.
          </p>
          <Link to="/find-services" className="btn btn-primary btn-sm">
            Browse Services & Request
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {requests.map((request) => (
            <div key={request._id} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Request ID</span>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--secondary-navy)', fontFamily: 'var(--font-heading)' }}>
                    {request.requestId}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <StatusBadge status={request.status} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Created: {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Customer Details</span>
                  <div style={{ fontWeight: 600 }}>{request.customerName}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Phone size={14} /> {request.contactNumber}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Provider & Service</span>
                  <div style={{ fontWeight: 600 }}>{request.providerName}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--primary-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Wrench size={14} /> {request.service}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location & Urgency</span>
                  <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={14} style={{ color: 'var(--primary-emerald)' }} /> {request.location}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', fontWeight: 600 }}>
                    Urgency: {request.urgency}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Preferred Service Date</span>
                  <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Calendar size={14} /> {request.preferredDate}
                  </div>
                </div>
              </div>

              <div style={{ background: 'var(--neutral-bg)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Problem Description:</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                  {request.problem}
                </p>
              </div>

              {/* Hackathon Demo Status Change Control */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--secondary-navy)' }}>Demo Status Update:</span>
                  <select
                    className="form-select"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.85rem', width: 'auto' }}
                    value={request.status}
                    onChange={(e) => handleStatusChange(request._id, e.target.value)}
                    disabled={actionLoading === request._id}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <button
                  onClick={() => handleDelete(request._id)}
                  className="btn btn-danger btn-sm"
                  disabled={actionLoading === request._id}
                >
                  <Trash2 size={14} /> Cancel / Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequests;
