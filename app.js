var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usuarioRouter = require('./routes/usuario');
var productoRouter = require('./routes/producto');


var app = express();

//connecting DB
mongoose.connect('mongodb://localhost:27017/TiendaRopa')
.then(db => console.log('DB conected'))
.catch(err => console.log(err));

mongoose.Promise =  global.Promise;

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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usuario',usuarioRouter);
app.use('/producto',productoRouter);


module.exports = app;
