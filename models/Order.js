const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  productName: {
    type: String,
    required: [true, 'Please add a product name']
  },
  category: {
    type: String,
    default: 'Uncategorized'
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  totalAmount: {
    type: Number
  },
  paymentMethod: {
    type: String,
    default: 'Cash'
  },
  notes: {
    type: String
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Calculate totalAmount before saving
orderSchema.pre('save', function() {
  this.totalAmount = this.quantity * this.price;
});

module.exports = mongoose.model('Order', orderSchema);
