var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var multer =require('multer');

if (process.env.NODE_ENV !== 'production'){
require('dotenv').config();
}




var usuarioRouter = require('./routes/usuario');
var productoRouter = require('./routes/producto');
var imagenesRouter = require('./routes/imagenes');
var notFoundRouter = require('./routes/404');
var indexRouter = require('./routes/home');
var allRouter = require('./routes/all');
var womenRouter = require('./routes/women');
var menRouter = require('./routes/men');
var shoesRouter = require('./routes/shoes');
var ageRestrictedRouter = require('./routes/age18');

var app = express();

//connecting DB
mongoose.connect(process.env.MONGO_URI,{
useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true})
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


const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb)=>{
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});
//en el single esta el nombre del input  donde se subira  la imagen
app.use(multer({storage}).single('image'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuario',usuarioRouter);
app.use('/producto',productoRouter);
app.use('/imagenes', imagenesRouter);
app.use('/404', notFoundRouter);
app.use('/home', indexRouter);
app.use('/all', allRouter);
app.use('/women', womenRouter);
app.use('/men', menRouter);
app.use('/shoes', shoesRouter);
app.use('/age18', ageRestrictedRouter);

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { title: 'No encontrado' });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

module.exports = app;
