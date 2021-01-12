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


app.use((req, res, next) => {

  const publicRoute = /^\/auth\/authenticate$/;

  // Verifica se a rota é pública ou privada
  // Se for pública, não executa nenhum middleware
  if (!publicRoute.test(req.path)) {

    // verifica se está autenticado
    app.use(authMiddleware);

    // Veriifica de é admin
    app.use(isAdmin);

  }

  return next();

});

require('./app/controllers/index')(app);

module.exports = app;
