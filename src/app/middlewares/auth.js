const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth-config');

module.exports = (req, res, next) => {
    console.log(req.headers)
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send({ Error: "No token provaded" });

    const parts = authHeader.split(' ');
    if (!parts.length === 2)
        return res.status(401).send({ Erro: "Token error"});

    const [ schema, token ] =  parts;
    if(!/^Bearer$/i.test(schema))
        return res.status(401).send({ Erro: "Token malformatted"});

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ Error: "Token invalid" });

        req.userId = decoded.id;
        return next();

    });
    
};