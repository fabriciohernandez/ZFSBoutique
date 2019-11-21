var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var multer =require('multer');
var passport = require('passport');
var expressSession = require('express-session');
var user = require("./models/Usuario");

if (process.env.NODE_ENV !== 'production'){
require('dotenv').config();
}



var usuarioRouter = require('./routes/usuario');
var productoRouter = require('./routes/producto');
var imagenesRouter = require('./routes/imagenes');


var app = express();




//connecting DB
mongoose.connect(process.env.MONGO_URI,{
useNewUrlParser: true})
.then(db => console.log('DB conected'))
.catch(err => console.log(err));

mongoose.Promise =  global.Promise;



//Define views engine
app.set('views', './views');
app.set('view engine', 'pug');


//starting the server
app.set('port' ,process.env.PORT || 3050);

app.listen(app.get('port'), ()=>{
  console.log(`server on port ${app.set('port')}`);
  console.log('Enviroment', process.env.NODE_ENV);
});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: 'zfsboutique'}));
app.use(passport.initialize());
app.use(passport.session());



const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb)=>{
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
//en el single esta el nombre del input  donde se subira  la imagen
app.use(multer({storage}).single('image'));


app.use('/usuario',usuarioRouter);
app.use('/producto',productoRouter);
app.use('/imagenes', imagenesRouter);


passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = app;
