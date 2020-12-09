const mongoose = require('mongoose')
    , dataConnection = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sgjg9.azure.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(dataConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.Promise = global.Promise;

module.exports = mongoose;