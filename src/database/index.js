const mongoose = require('mongoose')
  , dataConnection = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sgjg9.azure.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// a propriedade useFindAndModify foi definida para false devido a atualização ocorrida no drive do Mongo
// doc: https://mongoosejs.com/docs/deprecations.html#findandmodify
mongoose.connect(dataConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise;

module.exports = mongoose;