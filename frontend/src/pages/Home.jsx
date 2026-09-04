import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Zap, ShieldCheck, MapPin, Wrench, Droplet, Car, Airplay, CheckCircle2, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="hero-content">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>
            <Zap size={14} /> Sri Lanka's Local Service Network
          </span>
          <h1 className="hero-title">
            Need a reliable local repair? <span>FixLanka</span> connects you fast.
          </h1>
          <p className="hero-subtitle">
            No more relying on uncertain WhatsApp group messages or unverified contacts. Discover rated electricians, plumbers, mechanics, and AC technicians in your town.
          </p>
          <div className="hero-actions">
            <Link to="/find-services" className="btn btn-primary">
              <Search size={18} /> Find a Service Provider
            </Link>
            <Link to="/my-requests" className="btn btn-secondary">
              Track My Request
            </Link>
          </div>
        </div>
      </section>

      {/* Sri Lankan Problem & Solution Section */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ textAlignment: 'center', textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Why FixLanka?</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Built specifically for Sri Lankan households seeking fast, accountable local trade services.
          </p>
        </div>

        <div className="feature-grid">
          <div className="card">
            <div className="category-icon" style={{ background: '#fef3c7', color: '#d97706', marginBottom: '1rem' }}>
              <MapPin size={24} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Location-Based Matching</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Find technicians in Kandy, Colombo, Peradeniya, Katugastota, Kundasale, Matale, Kurunegala, and Gampola instantly.
            </p>
          </div>

          <div className="card">
            <div className="category-icon" style={{ background: '#ecfdf5', color: '#059669', marginBottom: '1rem' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Transparent Smart Match</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Our rule-based algorithm ranks providers by trade fit, proximity, immediate availability, and verified ratings.
            </p>
          </div>

          <div className="card">
            <div className="category-icon" style={{ background: '#e0e7ff', color: '#4f46e5', marginBottom: '1rem' }}>
              <Zap size={24} />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>Direct Request & Tracking</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Submit problem descriptions and preferred dates. Get a tracking ID (e.g. FL-1001) to check job status anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem' }}>Popular Service Categories</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Choose a trade to view available providers</p>
          </div>
          <Link to="/find-services" style={{ color: 'var(--primary-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="category-grid">
          <Link to="/find-services?service=Electrician" className="category-card">
            <div className="category-icon"><Zap size={24} /></div>
            <h4 style={{ margin: 0 }}>Electricians</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Wiring, Trips, Inverters</span>
          </Link>

          <Link to="/find-services?service=Plumber" className="category-card">
            <div className="category-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}><Droplet size={24} /></div>
            <h4 style={{ margin: 0 }}>Plumbers</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Leaks, Tanks, Drainage</span>
          </Link>

          <Link to="/find-services?service=AC Technician" className="category-card">
            <div className="category-icon" style={{ background: '#fef3c7', color: '#d97706' }}><Airplay size={24} /></div>
            <h4 style={{ margin: 0 }}>AC Technicians</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Services, Gas Refills</span>
          </Link>

          <Link to="/find-services?service=Mechanic" className="category-card">
            <div className="category-icon" style={{ background: '#f3e8ff', color: '#9333ea' }}><Car size={24} /></div>
            <h4 style={{ margin: 0 }}>Mechanics</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Breakdowns, Maintenance</span>
          </Link>
        </div>
      </section>

      {/* How FixLanka Works */}
      <section className="card" style={{ background: 'linear-gradient(to right, #f8fafc, #f1f5f9)', padding: '2.5rem', marginBottom: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>How FixLanka Works in 3 Simple Steps</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-emerald)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, margin: '0 auto 1rem auto' }}>1</div>
            <h4>Search & Filter</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Select your trade and location (e.g. Electrician in Kandy).</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-emerald)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, margin: '0 auto 1rem auto' }}>2</div>
            <h4>Review Smart Match</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Check rating, experience, and transparent Smart Match compatibility score.</p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-emerald)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, margin: '0 auto 1rem auto' }}>3</div>
            <h4>Submit & Track</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Submit job details, receive FL-100X tracking ID, and monitor status updates.</p>
          </div>
        </div>
      </section>
    </div>
  );
};


export default Home;
