import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.brandContainer}>
          <img src="/logo.png" alt="Avenue CRM Logo" style={styles.logoIcon} />
          <span style={styles.brandName}>Avenue CRM</span>
        </div>
        <div style={styles.navActions}>
          <Link to="/login" style={styles.loginBtn}>
            Log in
          </Link>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/register')}
          >
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.badge}>✨ The New Standard for Customer Management</div>
          <h1 style={styles.heroTitle}>
            Manage your customers and orders with <span style={{ color: 'var(--accent-primary)' }}>unmatched precision.</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Avenue CRM is the lightning-fast, enterprise-grade platform built for modern teams. Track purchases, monitor revenue, and delight your customers in one unified workspace.
          </p>
          <div style={styles.ctaGroup}>
            <button 
              className="btn btn-primary" 
              style={styles.mainCta}
              onClick={() => navigate('/register')}
            >
              Start for free &rarr;
            </button>
            <p style={styles.subText}>No credit card required. Setup in 60 seconds.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
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
    color: 'var(--text-primary)'
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
  },
  hero: {
    padding: '6rem 5% 4rem 5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    animation: 'fadeInUp 0.6s ease forwards'
  },
  heroContent: {
    maxWidth: '800px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '5rem'
  },
  badge: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: '#eff6ff',
    color: 'var(--accent-primary)',
    borderRadius: '2rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    marginBottom: '2rem',
    border: '1px solid #bfdbfe'
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    lineHeight: '1.1',
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em'
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    marginBottom: '3rem',
    maxWidth: '650px'
  },
  ctaGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem'
  },
  mainCta: {
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    borderRadius: '0.5rem',
    fontWeight: '600'
  },
  subText: {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)'
  }
};

export default LandingPage;
