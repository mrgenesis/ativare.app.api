const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/noderest', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;