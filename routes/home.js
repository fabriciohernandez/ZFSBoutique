var express = require('express');
var router = express.Router();

router.get('/', (req,res) =>{
  res.render('home', { title: 'Home' });
});

module.exports = router;
