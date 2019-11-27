var express = require("express");
var router = express.Router();
const { ensureAuthenticated} = require('../config/auth')
const controllerUsuario = require("../controllers/ControllerUsuario");


router.get('/addToCart/:idProducto', controllerUsuario.addItem)

module.exports = router;