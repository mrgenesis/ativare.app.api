const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: Number, dafault: 0 }
});
const Counter = mongoose.model('counter', counterSchema);

module.exports = Counter;