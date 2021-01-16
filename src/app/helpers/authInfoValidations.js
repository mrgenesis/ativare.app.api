const roles = require('./roles');
const isAuth = require('./isAuth');
const isAdmin = require('./isAdmin');
const isBasic = require('./isBasic');


function isAuthAndRole(request, role, fn) {
  let msg = 'No msg';
  const getCodeOrSetAsAllowed = (() => {
    if (!isAuth(request)) {
      (request.informations.msg) ? msg = request.informations.msg : '';
      return 401;
    }
    else if (!roles[role](request)) {
      msg = 'Denied access.'
      return 403;
    }
    else {
      return 'allowed';
    }
  })();
  fn(getCodeOrSetAsAllowed, msg);
}

module.exports = { isAuth, isAdmin, isBasic, isAuthAndRole };