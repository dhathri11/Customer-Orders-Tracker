import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const AboutUsPage = () => {
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
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>About Us</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '3rem' }}>
            We're on a mission to build the future of customer relationship management. We believe that software should be beautiful, lightning-fast, and intuitively designed for modern teams.
          </p>
          
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', marginTop: '3rem' }}>Our Story</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Avenue CRM was founded with a simple observation: existing CRM tools were too complex, too slow, and too difficult to implement. We set out to create a platform that users actually enjoy logging into every day.
          </p>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            Today, Avenue CRM powers thousands of businesses worldwide, helping them manage millions of customer interactions with unmatched precision.
          </p>
          
          <div style={{ marginTop: '4rem', padding: '3rem', backgroundColor: '#ffffff', borderRadius: '1rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Join our journey</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px' }}>We are always looking for talented individuals who share our passion for building incredible products.</p>
            <button className="btn btn-primary" onClick={() => navigate('/careers')}>View Open Positions</button>
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

export default AboutUsPage;
