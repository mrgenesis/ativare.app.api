const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: Number, dafault: 0 },
  codePrefix: { type: String }
});
const Counter = mongoose.model('counter', counterSchema);

module.exports = Counter;