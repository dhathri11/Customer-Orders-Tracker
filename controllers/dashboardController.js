const Order = require('../models/Order');
const Customer = require('../models/Customer');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const { startDate, endDate } = req.query;

    // 1. Total Customers
    const totalCustomers = await Customer.countDocuments({ user: userId });

    // 2. Fetch all customers for this user to get their IDs
    const userCustomers = await Customer.find({ user: userId }).select('_id name');
    const customerIds = userCustomers.map(c => c._id);

    // Build order query
    const orderQuery = { customer: { $in: customerIds } };
    if (startDate && endDate) {
      orderQuery.orderDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    // 3. Fetch all orders for these customers with optional date filter
    const orders = await Order.find(orderQuery).populate('customer', 'name');

    // 4. Total Purchases Count
    const totalPurchases = orders.length;

    // 5. Total Revenue
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

    // 6. Recent Purchases (last 5, sorted by date desc)
    const recentPurchases = await Order.find(orderQuery)
      .populate('customer', 'name email')
      .sort({ orderDate: -1 })
      .limit(5);

    // 7. Top Customers (by total spend)
    // We can calculate this manually since it's a small dataset, or use aggregation.
    // Manual calculation for simplicity:
    const customerSpendMap = {};
    
    orders.forEach(order => {
      const cid = order.customer._id.toString();
      if (!customerSpendMap[cid]) {
        customerSpendMap[cid] = {
          _id: cid,
          name: order.customer.name,
          totalSpent: 0
        };
      }
      customerSpendMap[cid].totalSpent += (order.totalAmount || 0);
    });

    const topCustomers = Object.values(customerSpendMap)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);

    const allCustomerSpend = Object.values(customerSpendMap)
      .sort((a, b) => b.totalSpent - a.totalSpent);

    // 8. Revenue by Date (last 7 days logic could go here, but we'll just group all for simplicity in this demo)
    const revenueByDateMap = {};
    const revenueByCategoryMap = {};

    orders.forEach(order => {
      // Group by Date
      const date = new Date(order.orderDate).toISOString().split('T')[0]; // YYYY-MM-DD
      if (!revenueByDateMap[date]) revenueByDateMap[date] = 0;
      revenueByDateMap[date] += (order.totalAmount || 0);

      // Group by Category
      const category = order.category || 'Uncategorized';
      if (!revenueByCategoryMap[category]) revenueByCategoryMap[category] = 0;
      revenueByCategoryMap[category] += (order.totalAmount || 0);
    });

    const revenueByDate = Object.keys(revenueByDateMap)
      .sort()
      .map(date => ({ date, revenue: revenueByDateMap[date] }));

    const revenueByCategory = Object.keys(revenueByCategoryMap)
      .map(name => ({ name, value: revenueByCategoryMap[name] }))
      .sort((a, b) => b.value - a.value);

    res.status(200).json({
      totalCustomers,
      totalPurchases,
      totalRevenue,
      recentPurchases,
      topCustomers,
      allCustomerSpend,
      revenueByDate,
      revenueByCategory
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats
};
