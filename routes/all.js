var express = require("express");
var router = express.Router();
var controllerProducto = require("../controllers/controllerProducto")
const { ensureAuthenticated} = require('../config/auth')

router.get("/", ensureAuthenticated, controllerProducto.getAll);

module.exports = router;
