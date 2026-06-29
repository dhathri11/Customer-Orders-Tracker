import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { updateOrder } from '../api';

const EditOrderModal = ({ isOpen, onClose, editOrder, onOrderUpdated }) => {
  const [formData, setFormData] = useState({ 
    productName: '', 
    category: '',
    quantity: 1, 
    price: '',
    paymentMethod: 'Card',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editOrder) {
      setFormData({
        productName: editOrder.productName || '',
        category: editOrder.category || '',
        quantity: editOrder.quantity || 1,
        price: editOrder.price || '',
        paymentMethod: editOrder.paymentMethod || 'Card',
        notes: editOrder.notes || ''
      });
    }
  }, [editOrder, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const orderPayload = {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price)
      };
      await updateOrder(editOrder._id, orderPayload);
      onOrderUpdated();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Purchase">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}
        
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
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={styles.label}>Payment Method</label>
            <select 
              name="paymentMethod" 
              value={formData.paymentMethod} 
              onChange={handleChange}
            >
              <option value="Card">Card</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Notes (Optional)</label>
            <input 
              type="text" name="notes" placeholder="Additional details..." 
              value={formData.notes} onChange={handleChange} 
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ minWidth: '140px' }}>
            {loading ? 'Processing...' : 'Save Changes'}
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

export default EditOrderModal;
