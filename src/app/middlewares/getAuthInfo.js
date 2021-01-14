const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth-config');

module.exports = (req, _, next) => {
  const authHeader = req.headers.authorization;

  req.informations = {};
  req.informations.auth = null;

  // Verifica se a rota é pública ou privada
  // Se for pública, não executa nada
  if (!authHeader) {
    req.informations.msg = 'No token provaded';
    return next();
  }

  const parts = authHeader.split(' ');
  if (!parts.length === 2) {
    req.informations.msg = 'Token error';
    return next();
  }

  const [schema, token] = parts;
  if (!/^Bearer$/i.test(schema)) {
    req.informations.msg = 'Token malformatted';
    return next();
  }

  if (token === null || token === 'null') {
    req.informations.msg = 'Token invalid';
    return next();
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      req.informations.msg = 'Token invalid';
      return next();
    }

    req.userId = decoded.id;
    req.informations.auth = { ...decoded };
    return next();

  });
};