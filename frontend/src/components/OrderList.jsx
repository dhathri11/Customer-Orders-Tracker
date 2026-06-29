import React from 'react';

const OrderList = ({ orders, totalAmount, onEdit, onDelete }) => {
  if (!orders || orders.length === 0) {
    return <p style={{ color: 'var(--text-secondary)', padding: '1rem 0' }}>No purchases found.</p>;
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        {orders.map((order, index) => (
          <div key={order._id} style={{ padding: '1.5rem', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-primary)' }}>Purchase #{index + 1}</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" onClick={() => onEdit(order)} style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>✏️ Edit</button>
                <button className="btn btn-secondary" onClick={() => onDelete(order._id)} style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', color: '#ef4444' }}>🗑️ Delete</button>
              </div>
            </div>
            
            <div style={styles.row}><span style={styles.label}>Product :</span> <span>{order.productName}</span></div>
            <div style={styles.row}><span style={styles.label}>Category :</span> <span>{order.category}</span></div>
            <div style={styles.row}><span style={styles.label}>Price :</span> <span>₹{order.price.toLocaleString('en-US')}</span></div>
            <div style={styles.row}><span style={styles.label}>Quantity :</span> <span>{order.quantity}</span></div>
            <div style={styles.row}><span style={styles.label}>Date :</span> <span>{new Date(order.orderDate).toLocaleDateString('en-GB').replace(/\//g, '-')}</span></div>
            <div style={styles.row}><span style={styles.label}>Payment :</span> <span>{order.paymentMethod}</span></div>
            {order.notes && <div style={styles.row}><span style={styles.label}>Notes :</span> <span>{order.notes}</span></div>}
          </div>
        ))}
      </div>
      
      <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-blue)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
        Total Purchases : ₹{totalAmount.toLocaleString('en-US')}
      </div>
    </div>
  );
};

const styles = {
  row: {
    display: 'flex',
    marginBottom: '0.25rem',
    fontSize: '0.95rem'
  },
  label: {
    width: '100px',
    color: 'var(--text-secondary)',
    fontWeight: '500'
  }
};

export default OrderList;
