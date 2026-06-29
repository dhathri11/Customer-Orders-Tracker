import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const ContactPage = () => {
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
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <div>
            <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Get in touch</h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
              Have questions about our product, pricing, or looking for a custom enterprise plan? We'd love to hear from you.
            </p>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Support</h4>
              <p style={{ color: 'var(--text-secondary)' }}>support@avenuecrm.com</p>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Sales</h4>
              <p style={{ color: 'var(--text-secondary)' }}>sales@avenuecrm.com</p>
            </div>
            
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Office</h4>
              <p style={{ color: 'var(--text-secondary)' }}>123 Startup Ave<br/>San Francisco, CA 94105</p>
            </div>
          </div>
          
          <div className="glass-panel" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Send us a message</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Name</label>
                <input type="text" placeholder="Jane Doe" />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Email</label>
                <input type="email" placeholder="jane@example.com" />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Message</label>
                <textarea 
                  rows="4" 
                  placeholder="How can we help you?" 
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: '#f8fafc', fontFamily: 'inherit', resize: 'vertical' }}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>Send Message</button>
            </form>
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

export default ContactPage;
