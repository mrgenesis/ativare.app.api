const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    name: { type: String },
    unitPrice: { type: Number },
    rule: { type: String }
});

const Material = mongoose.model('material', materialSchema);

module.exports = Material;