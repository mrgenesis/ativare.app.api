const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth-config');

module.exports = (req, res, next) => {

  if (!authHeader)
    return res.status(401).send({ Error: "No token provaded" });

  const parts = authHeader.split(' ');
  if (!parts.length === 2)
    return res.status(401).send({ Erro: "Token error" });

  const [schema, token] = parts;
  if (!/^Bearer$/i.test(schema))
    return res.status(401).send({ Erro: "Token malformatted" });

  if (token === null || token === 'null')
    return res.status(401).send({ Error: "Token invalid" });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ Error: "Token invalid" });

    req.userId = decoded.id;
    req.app.locals.auth = { ...decoded };
    return next();

  });

};