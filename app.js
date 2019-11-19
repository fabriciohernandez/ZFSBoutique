var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');



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


module.exports = app;
