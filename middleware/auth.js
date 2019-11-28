const auth = async (req, res, next) => {
  if (req.user.Rol == 0) {
    return next();
  } else {
    req.flash("error", "Por favor Inicia sesion con una cuenta administrativa");
    res.redirect("/login");
  }
};

module.exports = auth;
