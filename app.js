<<<<<<< Updated upstream
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
=======
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var multer = require("multer");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require('passport');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");
var productoRouter = require("./routes/producto");
var notFoundRouter = require("./routes/404");
var allRouter = require("./routes/all");
var womenRouter = require("./routes/women");
var menRouter = require("./routes/men");
var shoesRouter = require("./routes/shoes");
var ageRestrictedRouter = require("./routes/age18");
>>>>>>> Stashed changes



var indexRouter = require('./routes/home');
var allRouter = require('./routes/all');
var womenRouter = require('./routes/women');
var menRouter = require('./routes/men');
var shoesRouter = require('./routes/shoes');
var ageRestrictedRouter = require('./routes/age18');
var usersRouter = require('./routes/users');
var usuarioRouter = require('./routes/usuario');
var productoRouter = require('./routes/producto');


var app = express();

//connecting DB
mongoose.connect('mongodb://localhost:27017/TiendaRopa')
.then(db => console.log('DB conected'))
.catch(err => console.log(err));

mongoose.Promise =  global.Promise;

app.set('views', './views');
app.set('view engine', 'pug');

//starting the server
app.set('port' ,process.env.PORT || 3000);

app.listen(app.get('port'), ()=>{
  console.log(`server on port ${app.set('port')}`);
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
<<<<<<< Updated upstream
app.use(express.static(path.join(__dirname, 'public')));

app.use('/home', indexRouter);
app.use('/all', allRouter);
app.use('/women', womenRouter);
app.use('/men', menRouter);
app.use('/shoes', shoesRouter);
app.use('/age18', ageRestrictedRouter)
app.use('/users', usersRouter);
app.use('/usuario',usuarioRouter);
app.use('/producto',productoRouter);

=======
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//passport middlewares
app.use(passport.initialize());
app.use(passport.session());


app.use(flash())

//global vars
app.use((req, res, next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

//ROUTES
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/producto", productoRouter);
app.use("/404", notFoundRouter);
app.use("/all", allRouter);
app.use("/women", womenRouter);
app.use("/men", menRouter);
app.use("/shoes", shoesRouter);
app.use("/age18", ageRestrictedRouter);

app.use(function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts("html")) {
    res.render("404", { title: "No encontrado" });
    return;
  }

  // respond with json
  if (req.accepts("json")) {
    res.send({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  res.type("txt").send("Not found");
});
>>>>>>> Stashed changes

module.exports = app;
