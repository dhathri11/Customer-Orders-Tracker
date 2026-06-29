import React, { useState, useEffect } from 'react';
import { getCustomers, getDashboardStats } from '../api';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import CreateCustomerModal from './CreateCustomerModal';
import QuickAddPurchaseModal from './QuickAddPurchaseModal';

const Dashboard = ({ onSelectCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuickPurchaseOpen, setIsQuickPurchaseOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');

  const fetchData = async () => {
    try {
      let startDate, endDate;
      const today = new Date();
      
      if (dateRange === 'today') {
        startDate = new Date(today.setHours(0,0,0,0)).toISOString();
        endDate = new Date(today.setHours(23,59,59,999)).toISOString();
      } else if (dateRange === 'week') {
        const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
        startDate = new Date(firstDay.setHours(0,0,0,0)).toISOString();
        endDate = new Date(new Date().setHours(23,59,59,999)).toISOString();
      } else if (dateRange === 'month') {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999).toISOString();
      }

      const customersData = await getCustomers();
      const statsData = await getDashboardStats(startDate, endDate);
      setCustomers(customersData);
      setStats(statsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const handleCustomerAdded = () => {
    fetchData(); // Refresh all data to update stats
  };

  const exportToCSV = () => {
    if (!stats || !stats.allCustomerSpend) return;
    
    // Headers
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Customer Name,Total Spent\n";
    
    // Rows
    stats.allCustomerSpend.forEach(c => {
      // Escape names with commas
      const name = c.name.includes(',') ? `"${c.name}"` : c.name;
      csvContent += `${name},${c.totalSpent}\n`;
    });
    
    // Trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `customers_export_${dateRange}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.phone && c.phone.includes(searchTerm))
  );

  return (
    <div>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Welcome back. Here is what's happening today.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', fontWeight: '600', color: 'var(--text-primary)', cursor: 'pointer' }}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="btn btn-secondary" onClick={exportToCSV} style={{ padding: '0.6rem 1.25rem', fontWeight: '600', borderRadius: '8px' }}>
            📥 Export CSV
          </button>
          <button className="btn btn-secondary" onClick={() => setIsQuickPurchaseOpen(true)} style={{ padding: '0.6rem 1.25rem', fontWeight: '600', borderRadius: '8px' }}>
            + Add Purchase
          </button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ padding: '0.6rem 1.25rem', fontWeight: '600', borderRadius: '8px' }}>
            + Add Customer
          </button>
        </div>
      </div>

      {/* Analytics Widgets */}
      {stats && (
        <>
          <div style={styles.statsGrid}>
            <div className="glass-panel" style={styles.statCard}>
              <div style={styles.statLabel}>Total Customers</div>
              <div style={styles.statValue}>{stats.totalCustomers}</div>
            </div>
            <div className="glass-panel" style={styles.statCard}>
              <div style={styles.statLabel}>Total Purchases</div>
              <div style={styles.statValue}>{stats.totalPurchases}</div>
            </div>
            <div className="glass-panel" style={styles.statCard}>
              <div style={styles.statLabel}>Total Revenue</div>
              <div style={styles.statValue}>₹{stats.totalRevenue.toLocaleString('en-US')}</div>
            </div>
          </div>

          {/* Charts Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            {/* Revenue Over Time */}
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Revenue Over Time</h3>
              <div style={{ flex: 1, minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.revenueByDate || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                    <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${val}`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}
                      formatter={(value) => [`₹${value}`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="var(--accent-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue by Category */}
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Sales by Category</h3>
              <div style={{ flex: 1, minHeight: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.revenueByCategory || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                    <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                      contentStyle={{ borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}
                    />
                    <Bar dataKey="value" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} minPointSize={5} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Recent Purchases and Top Customers */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Recent Purchases</h3>
            {stats.recentPurchases.length === 0 ? <p style={{color: 'var(--text-secondary)'}}>No recent purchases.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {stats.recentPurchases.map(p => (
                  <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>{p.customer.name} - {p.productName}</span>
                    <span style={{ color: 'var(--accent-purple)', fontWeight: '600' }}>₹{p.totalAmount?.toLocaleString('en-US')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Top Customers</h3>
            {stats.topCustomers.length === 0 ? <p style={{color: 'var(--text-secondary)'}}>No data available.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {stats.topCustomers.map(c => (
                  <div key={c._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>{c.name}</span>
                    <span style={{ color: 'var(--accent-blue)', fontWeight: '600' }}>₹{c.totalSpent?.toLocaleString('en-US')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Customer List</h2>
        <input 
          type="text" 
          placeholder="Search by Name, Email, or Phone..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '300px', marginBottom: 0 }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading dashboard...</div>
      ) : filteredCustomers.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>No customers found.</h3>
        </div>
      ) : (
        <div className="glass-panel">
          <table>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map(customer => (
                <tr key={customer._id}>
                  <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone || '-'}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
                      onClick={() => onSelectCustomer(customer)}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CreateCustomerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCustomerAdded={handleCustomerAdded}
        editCustomer={null}
      />

      <QuickAddPurchaseModal
        isOpen={isQuickPurchaseOpen}
        onClose={() => setIsQuickPurchaseOpen(false)}
        onPurchaseAdded={fetchData}
        existingCustomers={customers}
      />
    </div>
  );
};

const styles = {
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    padding: '1.5rem',
    textAlign: 'center'
  },
  statLabel: {
    color: 'var(--text-secondary)',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem',
    fontWeight: '600'
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'var(--text-primary)'
  }
};

export default Dashboard;
