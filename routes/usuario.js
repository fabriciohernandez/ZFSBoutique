var express = require('express');
var router = express.Router();
const ControllerUsuario = require("../controllers/ControllerUsuario");


router.get('/', ControllerUsuario.getAll);
router.get('/:id', ControllerUsuario.getOneById);

router.post('/insert', ControllerUsuario.insert);

router.put('/update', ControllerUsuario.update);

router.delete('/delete', ControllerUsuario.deleteById);
module.exports = router;
