const Order = require('../models/Order');
const Customer = require('../models/Customer');

// @desc    Create a new order for a customer
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { customerId, productName, category, quantity, price, paymentMethod, notes } = req.body;

    // Check if customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Verify the customer belongs to the logged in user
    if (customer.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to add orders to this customer' });
    }

    const order = await Order.create({
      customer: customerId,
      productName,
      category,
      quantity,
      price,
      paymentMethod,
      notes
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders for the logged-in user's customers
// @route   GET /api/orders
// @access  Private
const getOrders = async (req, res) => {
  try {
    // First, find all customers belonging to this user
    const userCustomers = await Customer.find({ user: req.user.id }).select('_id');
    const customerIds = userCustomers.map(c => c._id);

    // Fetch orders that belong to any of these customers
    const orders = await Order.find({ customer: { $in: customerIds } }).populate('customer', 'name email');
    
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an order
// @route   PUT /api/orders/:id
// @access  Private
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.customer.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this order' });
    }

    const { productName, category, quantity, price, paymentMethod, notes } = req.body;
    
    // We update fields and save so the pre('save') hook runs and updates totalAmount
    order.productName = productName || order.productName;
    order.category = category || order.category;
    order.quantity = quantity || order.quantity;
    order.price = price || order.price;
    order.paymentMethod = paymentMethod || order.paymentMethod;
    order.notes = notes !== undefined ? notes : order.notes;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Private
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.customer.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this order' });
    }

    await order.deleteOne();
    res.status(200).json({ message: 'Order removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder
};
