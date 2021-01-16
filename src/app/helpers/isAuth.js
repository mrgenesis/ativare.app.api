function isAuth(request) {
  if (typeof request.informations === 'undefined') {
    return false;
  }
  return !!request.informations.auth;
}
module.exports = isAuth;