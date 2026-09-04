import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FindServices from './pages/FindServices';
import ProviderProfile from './pages/ProviderProfile';
import RequestService from './pages/RequestService';
import MyRequests from './pages/MyRequests';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-services" element={<FindServices />} />
            <Route path="/providers/:id" element={<ProviderProfile />} />
            <Route path="/request/:providerId" element={<RequestService />} />
            <Route path="/request" element={<RequestService />} />
            <Route path="/my-requests" element={<MyRequests />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
