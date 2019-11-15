var express = require('express');
var router = express.Router();
const ControllerProducto = require("../controllers/controllerProducto");


router.get('/', ControllerProducto.getAll);
router.get('/:id', ControllerProducto.getOneById);

router.post('/insert', ControllerProducto.insert);

router.put('/update', ControllerProducto.update);

router.delete('/delete', ControllerProducto.deleteById);



module.exports = router;
