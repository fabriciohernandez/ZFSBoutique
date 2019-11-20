var express = require('express');
var router = express.Router();
const ControllerUsuario = require("../controllers/ControllerUsuario");


<<<<<<< Updated upstream
router.get('/', ControllerUsuario.getAll);
router.get('/:id', ControllerUsuario.getOneById);

router.post('/insert', ControllerUsuario.insert);

router.put('/update', ControllerUsuario.update);

router.delete('/delete', ControllerUsuario.deleteById);
=======
router.get('/', (req,res) =>{
  res.render('login', { title: 'login' });
  console.log("Ruta usuario accedida");
});

router.post('/add',ControllerUsuario.insert);

router.get('/Ver', ControllerUsuario.getAll);

//router.put('/update', ControllerUsuario.update);

//router.delete('/delete', ControllerUsuario.deleteById);

>>>>>>> Stashed changes
module.exports = router;
