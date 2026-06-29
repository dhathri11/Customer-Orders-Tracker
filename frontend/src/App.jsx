import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CustomerCard from './components/CustomerCard';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import FeaturesPage from './components/pages/FeaturesPage';
import PricingPage from './components/pages/PricingPage';
import IntegrationsPage from './components/pages/IntegrationsPage';
import AboutUsPage from './components/pages/AboutUsPage';
import CareersPage from './components/pages/CareersPage';
import ContactPage from './components/pages/ContactPage';
import PrivacyPolicyPage from './components/pages/PrivacyPolicyPage';
import TermsOfServicePage from './components/pages/TermsOfServicePage';

function App() {
  const [user, setUser] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoadingAuth(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setSelectedCustomer(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  if (loadingAuth) return null;

  return (
    <Router>
      <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
        
        {/* Render Navbar only if logged in */}
        {user && (
          <nav className="top-nav">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img src="/logo.png" alt="Avenue CRM Logo" style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }} />
              <div style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--text-primary)' }}>Avenue CRM</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Signed in as <strong style={{color: 'var(--text-primary)'}}>{user.name || user.email}</strong></span>
              <button className="btn btn-secondary" onClick={handleLogout}>Log out</button>
            </div>
          </nav>
        )}

        <Routes>
          <Route path="/" element={
            !user ? <LandingPage /> : <Navigate to="/dashboard" />
          } />
          
          <Route path="/login" element={
            !user ? <Auth onLogin={handleLogin} initialMode="login" /> : <Navigate to="/dashboard" />
          } />
          
          <Route path="/register" element={
            !user ? <Auth onLogin={handleLogin} initialMode="register" /> : <Navigate to="/dashboard" />
          } />
          
          <Route path="/dashboard" element={
            user ? (
              <div className="container">
                {selectedCustomer ? (
                  <CustomerCard 
                    customer={selectedCustomer} 
                    onClose={() => setSelectedCustomer(null)} 
                  />
                ) : (
                  <Dashboard onSelectCustomer={setSelectedCustomer} />
                )}
              </div>
            ) : <Navigate to="/login" />
          } />

          {/* Footer Pages */}
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
