import React, { useState, useEffect } from 'react';
import { getCustomerById, deleteCustomer, deleteOrder } from '../api';
import CreateOrderModal from './CreateOrderModal';
import CreateCustomerModal from './CreateCustomerModal';
import EditOrderModal from './EditOrderModal';
import OrderList from './OrderList';

const CustomerCard = ({ customer, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editOrderData, setEditOrderData] = useState(null);
  
  // Filters
  const [filterDate, setFilterDate] = useState('');
  const [filterProduct, setFilterProduct] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const data = await getCustomerById(customer._id);
      setDetails(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [customer._id]);

  const handleDeleteCustomer = async () => {
    if (window.confirm('Are you sure you want to delete this customer? This will also delete all their orders.')) {
      try {
        await deleteCustomer(details._id);
        onClose(); // Close the card, parent will need to refresh
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this purchase?')) {
      try {
        await deleteOrder(orderId);
        fetchDetails(); // Refresh details
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading || !details) {
    return <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>Loading details...</div>;
  }

  // Apply filters
  let filteredOrders = details.orders || [];
  if (filterDate) {
    filteredOrders = filteredOrders.filter(o => new Date(o.orderDate).toISOString().split('T')[0] === filterDate);
  }
  if (filterProduct) {
    filteredOrders = filteredOrders.filter(o => o.productName.toLowerCase().includes(filterProduct.toLowerCase()));
  }
  if (filterCategory) {
    filteredOrders = filteredOrders.filter(o => o.category.toLowerCase().includes(filterCategory.toLowerCase()));
  }

  const totalSpent = filteredOrders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  return (
    <div style={{ animation: 'fadeIn 0.3s ease', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button 
          className="btn btn-secondary" 
          onClick={onClose}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', background: 'transparent', color: 'var(--text-secondary)' }}
        >
          <span style={{ fontSize: '1.2rem' }}>&larr;</span> Back to Dashboard
        </button>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary" onClick={() => setIsEditModalOpen(true)}>✏️ Edit Profile</button>
          <button className="btn btn-secondary" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.05)' }} onClick={handleDeleteCustomer}>🗑️ Delete Customer</button>
        </div>
      </div>

      {/* Customer Profile Card */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
          {details.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.75rem', color: 'var(--text-primary)' }}>{details.name}</h2>
          <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📧 {details.email}
            </div>
            {details.phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📱 {details.phone}
              </div>
            )}
            {details.address && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📍 {details.address}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Purchases Header & Filters */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Purchase History</h3>
          <button className="btn btn-primary" onClick={() => setIsOrderModalOpen(true)}>+ Add Purchase</button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ flex: 1 }}>
            <label style={styles.filterLabel}>Date Filter</label>
            <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} style={styles.filterInput} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={styles.filterLabel}>Product Filter</label>
            <input type="text" placeholder="Search product..." value={filterProduct} onChange={e => setFilterProduct(e.target.value)} style={styles.filterInput} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={styles.filterLabel}>Category Filter</label>
            <input type="text" placeholder="Search category..." value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={styles.filterInput} />
          </div>
        </div>

      <OrderList 
        orders={filteredOrders} 
        totalAmount={totalSpent} 
        onEdit={(order) => setEditOrderData(order)}
        onDelete={handleDeleteOrder}
      />
      </div>

      <CreateOrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
        customerId={details._id}
        onOrderAdded={fetchDetails}
      />
      
      <EditOrderModal
        isOpen={!!editOrderData}
        onClose={() => setEditOrderData(null)}
        editOrder={editOrderData}
        onOrderUpdated={fetchDetails}
      />

      <CreateCustomerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onCustomerAdded={(updatedCustomer) => {
          setDetails({...details, ...updatedCustomer});
        }}
        editCustomer={details}
      />
    </div>
  );
};

const styles = {
  label: {
    display: 'inline-block',
    width: '120px',
    color: 'var(--text-secondary)'
  },
  filterLabel: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  filterInput: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-primary)',
    marginBottom: 0
  }
};

export default CustomerCard;
