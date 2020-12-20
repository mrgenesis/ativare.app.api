const mongoose = require('../../database/index');
const Counter = require('./counter');

const BudgetSchema = new mongoose.Schema({
  ownId: { type: String },
  customer: { type: Object },
  productsList: { type: Array },
  code: { type: Number, unique: true },
  createAt: { type: Date, default: Date.now }
});

BudgetSchema.pre('save', async function (next) {
  const budgetCounter = await Counter.findOneAndUpdate({ name: 'budget' }, { code: { $inc: 1 }, codePrefix: 'O' }, { upsert: true, new: true });
  this.code = budgetCounter.codePrefix + budgetCounter.code;
  next();
});

const Budget = mongoose.model('Budget', BudgetSchema);

module.exports = Budget;