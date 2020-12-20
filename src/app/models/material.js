const mongoose = require('mongoose');
const Counter = require('./counter');

const MaterialSchema = new mongoose.Schema({
  name: { type: String },
  unitPrice: { type: Number },
  rule: { type: String },
  code: { type: Number, unique: true },
  createAt: { type: Date, default: Date.now }
});


MaterialSchema.pre('save', async function (next) {
  const materialCode = await Counter.findOneAndUpdate({ name: 'material' }, { $inc: { code: 1 } }, { upsert: true, new: true });
  this.code = materialCode.code;
  next();
});

const Material = mongoose.model('material', MaterialSchema);

module.exports = Material;