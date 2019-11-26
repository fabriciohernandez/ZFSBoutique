var express = require("express");
var router = express.Router();
const passport = require('passport')


router.get("/", (req, res) => {
  res.render("login", { title: "login" });
});

//router.post("/", ControllerUsuario.login);

router.post("/iniciar", (req,res,next)=>{
  passport.authenticate('local',{
    successRedirect: '/age18',
    failureRedirect: '/login',
    failureFlash: true
  })(req,res,next)
})

router.get("/salir", (req, res, next)=>{
  req.logOut();
  req.flash('success_msg','Se ha cerrado sesion');
  res.redirect('/login')
})

module.exports = router;
