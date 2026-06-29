const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`
    };
  } else {
    return {
      'Content-Type': 'application/json'
    };
  }
};

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to register');
  return data;
};

export const login = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to login');
  return data;
};

export const getCustomers = async () => {
  const response = await fetch(`${API_URL}/customers`, {
    headers: getAuthHeaders()
  });
  if (response.status === 401) throw new Error('Not authorized');
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch customers');
  return data;
};

export const getCustomerById = async (id) => {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    headers: getAuthHeaders()
  });
  if (response.status === 401) throw new Error('Not authorized');
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch customer details');
  return data;
};

export const createCustomer = async (customerData) => {
  const response = await fetch(`${API_URL}/customers`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(customerData),
  });
  if (response.status === 401) throw new Error('Not authorized');
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to create customer');
  return data;
};

export const createOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });
  if (response.status === 401) throw new Error('Not authorized');
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to create order');
  return data;
};

export const updateCustomer = async (id, customerData) => {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(customerData),
  });
  if (response.status === 401) throw new Error('Not authorized');
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update customer');
  return data;
};

export const deleteCustomer = async (id) => {
  const response = await fetch(`${API_URL}/customers/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (response.status === 401) throw new Error('Not authorized');
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to delete customer');
  return data;
};

export const updateOrder = async (id, orderData) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(orderData),
  });
  if (response.status === 401) throw new Error('Not authorized');
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to update order');
  return data;
};

export const deleteOrder = async (id) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (response.status === 401) throw new Error('Not authorized');
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to delete order');
  return data;
};

export const getDashboardStats = async (startDate, endDate) => {
  let url = `${API_URL}/dashboard`;
  if (startDate && endDate) {
    url += `?startDate=${startDate}&endDate=${endDate}`;
  }
  const response = await fetch(url, {
    headers: getAuthHeaders()
  });
  if (response.status === 401) throw new Error('Not authorized');
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch dashboard stats');
  return data;
};
