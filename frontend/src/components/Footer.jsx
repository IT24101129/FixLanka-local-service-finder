import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ShieldCheck, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="brand-logo" style={{ color: 'white', marginBottom: '0.75rem' }}>
            <Wrench size={24} style={{ color: '#34d399' }} />
            <span>FixLanka</span>
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            Sri Lanka's trusted local service finder and request system. Connecting households with reliable electricians, plumbers, mechanics, and technicians in Kandy, Colombo, Peradeniya, and beyond.
          </p>
        </div>

        <div>
          <h4 className="footer-title">Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
            <li><Link to="/">Home Page</Link></li>
            <li><Link to="/find-services">Find Service Providers</Link></li>
            <li><Link to="/my-requests">Track Service Requests</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-title">Popular Regions</h4>
          <p style={{ fontSize: '0.875rem' }}>
            Kandy • Colombo • Peradeniya • Katugastota • Kundasale • Matale • Kurunegala • Gampola
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FixLanka. Built for Sri Lanka SEF Mini Hackathon.</p>
      </div>
    </footer>
  );
};

export default Footer;
