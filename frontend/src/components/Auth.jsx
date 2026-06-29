import React, { useState } from 'react';
import { login, register } from '../api';
import { Link, useNavigate } from 'react-router-dom';

const Auth = ({ onLogin, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Update mode if initialMode prop changes
  React.useEffect(() => {
    setIsLogin(initialMode === 'login');
    setError('');
  }, [initialMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let userData;
      if (isLogin) {
        userData = await login({ email: formData.email, password: formData.password });
      } else {
        userData = await register(formData);
      }
      
      localStorage.setItem('user', JSON.stringify(userData));
      onLogin(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div className="glass-panel" style={styles.authWrapper}>
        
        <Link to="/" style={styles.backBtn} className="back-btn">
          &larr; Back to Home
        </Link>

        <div style={styles.brandContainer}>
          <img src="/logo.png" alt="Avenue CRM Logo" style={styles.logoIcon} />
          <span style={styles.brandName}>Avenue CRM</span>
        </div>

        <div style={styles.formContainer}>
          <h2 style={styles.title}>{isLogin ? 'Welcome back' : 'Create an account'}</h2>
          <p style={styles.subtitle}>
            {isLogin ? 'Enter your details to access your dashboard.' : 'Start managing your customers and orders today.'}
          </p>
          
          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            {!isLogin && (
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="John Doe" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  style={styles.input}
                />
              </div>
            )}
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="name@company.com" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                style={styles.input}
              />
            </div>
            
            <button type="submit" className="btn btn-primary" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div style={styles.toggleText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link to={isLogin ? '/register' : '/login'} style={styles.toggleLink}>
              {isLogin ? 'Sign up for free' : 'Sign in here'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#f8fafc',
    backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
    backgroundSize: '20px 20px'
  },
  authWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '450px',
    padding: '3rem 3rem 4rem 3rem',
    position: 'relative',
    animation: 'fadeInUp 0.5s ease',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
    borderRadius: '16px',
    backgroundColor: '#ffffff'
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    alignSelf: 'flex-start',
    marginBottom: '2rem'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    marginBottom: '2.5rem'
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    objectFit: 'cover',
    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)'
  },
  brandName: {
    fontSize: '1.75rem',
    fontWeight: '700',
    letterSpacing: '0.02em',
    color: 'var(--text-primary)'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  title: {
    fontSize: '1.75rem',
    marginBottom: '0.5rem',
    fontWeight: '700',
    textAlign: 'center'
  },
  subtitle: {
    color: 'var(--text-secondary)',
    marginBottom: '2rem',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    textAlign: 'center'
  },
  error: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    padding: '0.85rem',
    borderRadius: 'var(--radius-md)',
    marginBottom: '1.5rem',
    fontSize: '0.9rem',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  input: {
    marginBottom: '0' 
  },
  submitBtn: {
    marginTop: '1rem',
    padding: '0.85rem',
    fontSize: '1rem'
  },
  toggleText: {
    marginTop: '2rem',
    textAlign: 'center',
    color: 'var(--text-secondary)',
    fontSize: '0.95rem'
  },
  toggleLink: {
    color: 'var(--accent-blue)',
    cursor: 'pointer',
    fontWeight: '600'
  }
};

export default Auth;
