import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Wrench, Search, ClipboardList, Home, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand-logo">
          <Wrench className="brand-icon" size={28} style={{ color: '#059669' }} />
          <span>FixLanka</span>
          <span className="brand-badge">Sri Lanka</span>
        </Link>

        {/* Desktop Navigation */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                <Home size={18} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/find-services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                <Search size={18} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Find Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-requests" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                <ClipboardList size={18} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                My Requests
              </NavLink>
            </li>
            <li>
              <Link to="/find-services" className="btn btn-primary btn-sm">
                Request Service
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
