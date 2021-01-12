module.exports = async (req, res, next) => {
  const perfilCurrentUser = req.app.locals.auth.perfilType;
  req.app.locals.isAdmin = (perfilCurrentUser.indexOf('admin') !== -1);
  return next();
}