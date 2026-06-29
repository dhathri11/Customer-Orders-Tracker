import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const PrivacyPolicyPage = () => {
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
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Last updated: January 1, 2024</p>
          
          <div style={{ lineHeight: '1.7', color: 'var(--text-primary)' }}>
            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Introduction</h3>
            <p style={{ marginBottom: '1rem' }}>
              Welcome to Avenue CRM. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
            </p>
            
            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. The data we collect about you</h3>
            <p style={{ marginBottom: '1rem' }}>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul style={{ paddingLeft: '2rem', marginBottom: '1rem' }}>
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
            </ul>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. How we use your data</h3>
            <p style={{ marginBottom: '1rem' }}>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to provide the services you requested, manage our relationship with you, and improve our platform.
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

export default PrivacyPolicyPage;
