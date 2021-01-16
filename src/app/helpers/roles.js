const isAdmin = require('./isAdmin');
const isBasic = require('./isBasic');

const roles = {
  admin: (req) => isAdmin(req),
  basic: (req) => isBasic(req)
};
module.exports = roles;