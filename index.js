require('dotenv').config();

const PORT = process.env.PORT || 3000
  , app = require('./src/server');

app.listen(PORT, () => console.log(`Servido na porta ${PORT}.`));