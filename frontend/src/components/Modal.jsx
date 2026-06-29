import React from 'react';
import '../index.css';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div className="glass-panel" style={styles.modal}>
        <div style={styles.header}>
          <h2>{title}</h2>
          <button style={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>
        <div style={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    display: 'flex',
    justifyContent: 'flex-end', /* Align drawer to the right */
    zIndex: 1000,
    animation: 'fadeIn 0.2s ease-out'
  },
  modal: {
    width: '100%',
    maxWidth: '500px',
    height: '100vh', /* Full height */
    padding: '2.5rem 2rem',
    backgroundColor: '#ffffff',
    boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
    animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid var(--border-color)',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    margin: 0
  },
  closeBtn: {
    background: '#f1f5f9',
    border: '1px solid transparent',
    color: 'var(--text-secondary)',
    fontSize: '1.25rem',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  }
};

export default Modal;
