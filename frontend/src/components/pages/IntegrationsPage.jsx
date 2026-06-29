import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const IntegrationsPage = () => {
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
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Integrations</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '3rem' }}>
            Connect Avenue CRM with the tools you already use. Streamline your workflow and keep your data synced across platforms.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {['Slack', 'Google Workspace', 'Microsoft Teams', 'Stripe', 'Mailchimp', 'Shopify', 'Zendesk', 'HubSpot'].map((integration) => (
              <div key={integration} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', cursor: 'pointer' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{integration}</span>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '4rem', textAlign: 'center', padding: '3rem', backgroundColor: '#eff6ff', borderRadius: '1rem', border: '1px solid #bfdbfe' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>Don't see your favorite tool?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>We are constantly adding new integrations. Build your own using our robust API.</p>
            <button className="btn btn-primary" onClick={() => navigate('/contact')}>Request Integration</button>
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

export default IntegrationsPage;
