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
var imagenesRouter = require("./routes/imagenes");
var notFoundRouter = require("./routes/404");
var allRouter = require("./routes/all");
var womenRouter = require("./routes/women");
var menRouter = require("./routes/men");
var shoesRouter = require("./routes/shoes");
var ageRestrictedRouter = require("./routes/age18");

var app = express();

//Passport config 
require('./config/passport')(passport)

//connecting DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(db => console.log("DB conected"))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

//Define views engine
app.set("views", "./views");
app.set("view engine", "pug");

//starting the server
app.set("port", process.env.PORT || 3050);

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.set("port")}`);
  console.log("Enviroment", process.env.NODE_ENV);
});

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
//en el single esta el nombre del input  donde se subira  la imagen
app.use(multer({ storage }).single("image"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
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
app.use("/imagenes", imagenesRouter);
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

module.exports = app;
