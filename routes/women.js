var express = require('express');
var router = express.Router();

router.get('/', (req,res) =>{
  res.render('women', { title: 'WOMEN' });
});

module.exports = router;