const isAuth = require('./isAuth');
function isAdmin(request) {
  if (!isAuth(request)) {
    return false;
  }
  return request.informations.auth.roles.indexOf('admin') !== -1;
}

module.exports = isAdmin;