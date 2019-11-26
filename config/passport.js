const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const Usuario = require("../models/Usuario");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "Correo" , passwordField: 'Password'}, (Correo, Password, done) => {
        console.log('entre',Correo, Password)

        Usuario.findOne({ Correo: Correo })
        .then(user => {
          if (!user) {
            return done(null, false, { message: "Correo no registrado." });
          }
          
          bcrypt.compare(Password, user.Password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
                return done(null, false, { message: "Contrasena incorrecta" });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
