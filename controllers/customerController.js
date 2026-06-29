const Customer = require('../models/Customer');
const Order = require('../models/Order');

// @desc    Create a new customer
// @route   POST /api/customers
// @access  Private
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const customerExists = await Customer.findOne({ email, user: req.user.id });
    if (customerExists) {
      return res.status(400).json({ message: 'Customer already exists with this email' });
    }

    const customer = await Customer.create({
      user: req.user.id,
      name,
      email,
      phone,
      address
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all customers for logged in user
// @route   GET /api/customers
// @access  Private
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single customer and their orders
// @route   GET /api/customers/:id
// @access  Private
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    if (customer.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    // Fetch orders associated with this customer
    const orders = await Order.find({ customer: customer._id }).sort({ orderDate: -1 });

    res.status(200).json({
      ...customer._doc,
      orders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update customer
// @route   PUT /api/customers/:id
// @access  Private
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    if (customer.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Private
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    if (customer.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    // Delete all orders associated with this customer first
    await Order.deleteMany({ customer: req.params.id });
    
    await customer.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
};
