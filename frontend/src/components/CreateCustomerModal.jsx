import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { createCustomer, updateCustomer } from '../api';

const CreateCustomerModal = ({ isOpen, onClose, onCustomerAdded, editCustomer }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editCustomer) {
      setFormData({
        name: editCustomer.name || '',
        email: editCustomer.email || '',
        phone: editCustomer.phone || '',
        address: editCustomer.address || ''
      });
    } else {
      setFormData({ name: '', email: '', phone: '', address: '' });
    }
  }, [editCustomer, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let savedCustomer;
      if (editCustomer) {
        savedCustomer = await updateCustomer(editCustomer._id, formData);
      } else {
        savedCustomer = await createCustomer(formData);
      }
      onCustomerAdded(savedCustomer, !!editCustomer);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editCustomer ? "Edit Customer" : "Add New Customer"}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={styles.label}>Full Name *</label>
            <input 
              type="text" name="name" placeholder="e.g. John Doe" 
              value={formData.name} onChange={handleChange} required 
            />
          </div>
          <div>
            <label style={styles.label}>Email Address *</label>
            <input 
              type="email" name="email" placeholder="john@example.com" 
              value={formData.email} onChange={handleChange} required 
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={styles.label}>Phone Number</label>
            <input 
              type="text" name="phone" placeholder="+1 (555) 000-0000" 
              value={formData.phone} onChange={handleChange} 
            />
          </div>
          <div>
            <label style={styles.label}>Physical Address</label>
            <input 
              type="text" name="address" placeholder="City, State" 
              value={formData.address} onChange={handleChange} 
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ minWidth: '140px' }}>
            {loading ? 'Saving...' : (editCustomer ? 'Save Changes' : 'Create Customer')}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const styles = {
  label: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  }
};

export default CreateCustomerModal;
