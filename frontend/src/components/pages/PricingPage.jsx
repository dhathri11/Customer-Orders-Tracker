import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const PricingPage = () => {
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
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Simple, transparent pricing.</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
            No hidden fees, no surprises. Choose the plan that best fits your growing business needs.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'left' }}>
            {/* Starter Plan */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Starter</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>For individuals and small teams.</p>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>$0<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '400' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li>✓ Up to 1,000 contacts</li>
                <li>✓ Basic order tracking</li>
                <li>✓ Standard reporting</li>
                <li>✓ Email support</li>
              </ul>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '0.75rem' }} onClick={() => navigate('/register')}>Get Started</button>
            </div>

            {/* Professional Plan */}
            <div className="glass-panel" style={{ padding: '2.5rem', border: '2px solid var(--accent-primary)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--accent-primary)', color: 'white', padding: '0.25rem 1rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '600' }}>MOST POPULAR</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Professional</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>For growing businesses.</p>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>$49<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '400' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li>✓ Unlimited contacts</li>
                <li>✓ Advanced order analytics</li>
                <li>✓ Custom dashboards</li>
                <li>✓ Priority 24/7 support</li>
              </ul>
              <button className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }} onClick={() => navigate('/register')}>Start Free Trial</button>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Enterprise</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>For large scale organizations.</p>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>Custom</div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li>✓ Everything in Pro</li>
                <li>✓ Dedicated account manager</li>
                <li>✓ Custom integrations</li>
                <li>✓ Advanced security & SLA</li>
              </ul>
              <button className="btn btn-secondary" style={{ width: '100%', padding: '0.75rem' }} onClick={() => navigate('/contact')}>Contact Sales</button>
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

export default PricingPage;
