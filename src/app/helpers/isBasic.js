const isAuth = require('./isAuth');
function isBasic(request) {
  if (!isAuth(request)) {
    return false;
  }
  return request.informations.auth.roles.indexOf('basic') !== -1;
}

module.exports = isBasic;