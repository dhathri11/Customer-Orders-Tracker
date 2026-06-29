import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const FeaturesPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', display: 'flex', flexDirection: 'column' }}>
      <nav style={styles.navbar}>
        <div style={styles.brandContainer}>
          <img src="/logo.png" alt="Avenue CRM Logo" style={styles.logoIcon} />
          <Link to="/" style={styles.brandName}>Avenue CRM</Link>
        </div>
        <div style={styles.navActions}>
          <Link to="/login" style={styles.loginBtn}>Log in</Link>
          <button className="btn btn-primary" onClick={() => navigate('/register')}>Get Started Free</button>
        </div>
      </nav>

      <main style={{ flex: 1, padding: '4rem 5%' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '0.5rem 1rem', backgroundColor: '#eff6ff', color: 'var(--accent-primary)', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1.5rem', border: '1px solid #bfdbfe' }}>Product</div>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Powerful features for modern teams.</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '3rem' }}>
            Avenue CRM comes packed with everything you need to manage your customer relationships effectively. Discover the tools that will power your business growth.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Contact Management</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Keep all your customer information in one place. Track interactions, store essential data, and understand your audience better.</p>
            </div>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Order Tracking</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Monitor purchases and track revenue streams in real-time. Gain insights into customer buying patterns.</p>
            </div>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Advanced Analytics</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Visualize your data with our powerful dashboard. Make informed decisions based on comprehensive reporting.</p>
            </div>
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Team Collaboration</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Work together seamlessly. Assign tasks, share notes, and keep everyone aligned on customer success.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 5%',
    backgroundColor: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border-color)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    objectFit: 'cover'
  },
  brandName: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    textDecoration: 'none'
  },
  navActions: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  },
  loginBtn: {
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: '0.95rem'
  }
};

export default FeaturesPage;
