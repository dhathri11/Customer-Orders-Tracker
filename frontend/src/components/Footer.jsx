import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerColumn}>
          <div style={styles.brandContainer}>
            <img src="/logo.png" alt="Avenue CRM Logo" style={styles.logoIconSmall} />
            <span style={styles.brandNameSmall}>Avenue CRM</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '1rem', lineHeight: '1.6' }}>
            Building the future of customer relationship management for modern enterprise teams.
          </p>
        </div>
        <div style={styles.footerColumn}>
          <h4 style={styles.footerHeading}>Product</h4>
          <Link to="/features" style={styles.footerLink}>Features</Link>
          <Link to="/pricing" style={styles.footerLink}>Pricing</Link>
          <Link to="/integrations" style={styles.footerLink}>Integrations</Link>
        </div>
        <div style={styles.footerColumn}>
          <h4 style={styles.footerHeading}>Company</h4>
          <Link to="/about" style={styles.footerLink}>About Us</Link>
          <Link to="/careers" style={styles.footerLink}>Careers</Link>
          <Link to="/contact" style={styles.footerLink}>Contact</Link>
        </div>
        <div style={styles.footerColumn}>
          <h4 style={styles.footerHeading}>Legal</h4>
          <Link to="/privacy" style={styles.footerLink}>Privacy Policy</Link>
          <Link to="/terms" style={styles.footerLink}>Terms of Service</Link>
        </div>
      </div>
      <div style={styles.footerBottom}>
        &copy; {new Date().getFullYear()} Avenue CRM. All rights reserved.
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid var(--border-color)',
    padding: '4rem 5% 2rem 5%'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '2rem',
    marginBottom: '4rem'
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoIconSmall: {
    width: '24px',
    height: '24px',
    borderRadius: '6px',
    objectFit: 'cover'
  },
  brandNameSmall: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--text-primary)'
  },
  footerHeading: {
    fontSize: '0.875rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '1.25rem'
  },
  footerLink: {
    color: 'var(--text-secondary)',
    fontSize: '0.875rem',
    marginBottom: '0.75rem',
    textDecoration: 'none'
  },
  footerBottom: {
    textAlign: 'center',
    paddingTop: '2rem',
    borderTop: '1px solid var(--border-color)',
    color: 'var(--text-secondary)',
    fontSize: '0.875rem'
  }
};

export default Footer;
