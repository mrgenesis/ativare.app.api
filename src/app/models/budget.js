const mongoose = require('../../database/index');

const BudgetSchema = new mongoose.Schema({
  ownId: { type: String },
  customer: { type: Object },
  productsList: { type: Array },
  createAt: {
    type: Date,
    default: Date.now
  }
});

const Budget = mongoose.model('Budget', BudgetSchema);

module.exports = Budget;