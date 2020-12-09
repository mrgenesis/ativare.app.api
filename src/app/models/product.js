const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  group: { type: String },
  description: { type: String },
  materials: { type: Array },
}); 

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
