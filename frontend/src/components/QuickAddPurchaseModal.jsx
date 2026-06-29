import React, { useState } from 'react';
import Modal from './Modal';
import { createCustomer, createOrder } from '../api';

const QuickAddPurchaseModal = ({ isOpen, onClose, onPurchaseAdded, existingCustomers }) => {
  const [formData, setFormData] = useState({
    // Customer Fields
    email: '',
    name: '',
    phone: '',
    // Order Fields
    productName: '',
    category: '',
    quantity: 1,
    price: '',
    paymentMethod: 'Card',
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [customerFound, setCustomerFound] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    
    // Auto-fill customer details if email matches an existing customer
    if (name === 'email') {
      const existing = existingCustomers.find(c => c.email.toLowerCase() === value.toLowerCase());
      if (existing) {
        newFormData.name = existing.name;
        newFormData.phone = existing.phone || '';
        setCustomerFound(true);
      } else {
        setCustomerFound(false);
      }
    }
    
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let customerId;
      
      // 1. Check if customer exists based on email
      const existing = existingCustomers.find(c => c.email.toLowerCase() === formData.email.toLowerCase());
      
      if (existing) {
        customerId = existing._id;
      } else {
        // 2. Create new customer if not found
        const newCustomer = await createCustomer({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        });
        customerId = newCustomer._id;
      }

      // 3. Create the order
      await createOrder({
        customerId,
        productName: formData.productName,
        category: formData.category,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
        paymentMethod: formData.paymentMethod,
        notes: formData.notes
      });

      onPurchaseAdded();
      
      // Reset form
      setFormData({
        email: '', name: '', phone: '',
        productName: '', category: '', quantity: 1, price: '', paymentMethod: 'Card', notes: ''
      });
      setCustomerFound(false);
      onClose();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Add Purchase">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: 0 }}>{error}</p>}
        
        {/* Customer Section */}
        <div>
          <h4 style={styles.sectionTitle}>1. Customer Details</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={styles.label}>Email Address *</label>
              <input 
                type="email" name="email" placeholder="Search by email..." 
                value={formData.email} onChange={handleChange} required 
                style={{ borderColor: customerFound ? 'var(--accent-primary)' : 'var(--border-color)' }}
              />
            </div>

            {customerFound ? (
              <div style={{ padding: '1rem', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>✓ Existing Customer Found</span>
                <div style={{ marginTop: '0.5rem', fontWeight: '600', color: '#1e3a8a' }}>{formData.name}</div>
                <div style={{ fontSize: '0.875rem', color: '#1e40af', marginTop: '0.25rem' }}>{formData.phone || 'No phone provided'}</div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={styles.label}>Full Name * (New Customer)</label>
                  <input 
                    type="text" name="name" placeholder="e.g. John Doe" 
                    value={formData.name} onChange={handleChange} required 
                  />
                </div>
                <div>
                  <label style={styles.label}>Phone Number</label>
                  <input 
                    type="text" name="phone" placeholder="+1 (555) 000-0000" 
                    value={formData.phone} onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Section */}
        <div>
          <h4 style={styles.sectionTitle}>2. Purchase Details</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={styles.label}>Product Name *</label>
              <input 
                type="text" name="productName" placeholder="e.g. Laptop" 
                value={formData.productName} onChange={handleChange} required 
              />
            </div>
            <div>
              <label style={styles.label}>Category</label>
              <input 
                type="text" name="category" placeholder="e.g. Electronics" 
                value={formData.category} onChange={handleChange} 
              />
            </div>
            <div>
              <label style={styles.label}>Quantity *</label>
              <input 
                type="number" name="quantity" placeholder="1" min="1"
                value={formData.quantity} onChange={handleChange} required 
              />
            </div>
            <div>
              <label style={styles.label}>Price (per item) *</label>
              <input 
                type="number" name="price" placeholder="₹0.00" step="0.01" min="0"
                value={formData.price} onChange={handleChange} required 
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ minWidth: '160px' }}>
            {loading ? 'Processing...' : 'Complete Purchase'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const styles = {
  sectionTitle: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '1rem',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '0.5rem'
  },
  label: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  helperText: {
    display: 'block',
    fontSize: '0.75rem',
    color: 'var(--accent-primary)',
    fontWeight: '600',
    marginTop: '0.5rem'
  }
};

export default QuickAddPurchaseModal;
