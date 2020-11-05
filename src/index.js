require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const app = express();

if (process.env.ENVIRONMENT === 'dev') {
  const cors = require('cors');
  app.use(cors());
}

// permitirá que a aplicação entenda requisições em JSON
app.use(bodyParser.json());


// permitirá que a aplicação entenda parâmetros via URL
app.use(bodyParser.urlencoded({ extended: false }));



require('./app/controllers/index')(app);


app.listen(PORT, () => console.log(`Servido na porta ${PORT}.`));