var express = require('express');
var router = express.Router();
const ControllerUsuario = require("../controllers/ControllerUsuario");


router.get('/', (req,res) =>{
  res.render('login', { title: 'login' });
});


router.post('/add', ControllerUsuario.insert);

router.get('/Iniciar', ControllerUsuario.getOneById);

router.put('/update', ControllerUsuario.update);

router.delete('/delete', ControllerUsuario.deleteById);

module.exports = router;
