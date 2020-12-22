const mongoose = require('mongoose');
const Counter = require('./counter');

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  group: { type: String },
  description: { type: String },
  materials: { type: Array },
  code: { type: String, unique: true },
  createAt: { type: Date, default: Date.now }
});

ProductSchema.pre('save', async function (next) {
  const productCounter = await Counter.findOneAndUpdate({ name: 'product' }, { $inc: { code: 1 }, codePrefix: 'P' }, { upsert: true, new: true });
  this.code = productCounter.codePrefix + productCounter.code;
  next();
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
