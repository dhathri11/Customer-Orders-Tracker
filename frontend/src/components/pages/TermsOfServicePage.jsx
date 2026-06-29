import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const TermsOfServicePage = () => {
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
        <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#ffffff', padding: '3rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Terms of Service</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Last updated: January 1, 2024</p>
          
          <div style={{ lineHeight: '1.7', color: 'var(--text-primary)' }}>
            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Agreement to Terms</h3>
            <p style={{ marginBottom: '1rem' }}>
              By accessing or using Avenue CRM, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you do not have permission to access the Service.
            </p>
            
            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. Subscriptions</h3>
            <p style={{ marginBottom: '1rem' }}>
              Some parts of the Service are billed on a subscription basis ("Subscriptions"). You will be billed in advance on a recurring and periodic basis.
            </p>
            
            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. User Content</h3>
            <p style={{ marginBottom: '1rem' }}>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
            </p>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. Changes</h3>
            <p style={{ marginBottom: '1rem' }}>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
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

export default TermsOfServicePage;
