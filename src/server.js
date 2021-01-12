const express = require('express')
  , bodyParser = require('body-parser')
  , app = express()
  , authMiddleware = require('./app/middlewares/auth')
  , isAdmin = require('./app/middlewares/isAdmin');

if (process.env.ENVIRONMENT === 'dev' || process.env.ENVIRONMENT === 'test') {
  const cors = require('cors');
  app.use(cors());
}

// permitirá que a aplicação entenda requisições em JSON
app.use(bodyParser.json());

// permitirá que a aplicação entenda parâmetros via URL
app.use(bodyParser.urlencoded({ extended: false }));

// verifica se está autenticado
app.use(authMiddleware);

// verifica se é perfil admin
app.use(isAdmin);

require('./app/controllers/index')(app);

module.exports = app;
