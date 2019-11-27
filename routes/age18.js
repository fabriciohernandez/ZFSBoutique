var express = require("express");
var router = express.Router();
const { ensureAuthenticated} = require('../config/auth')
var controllerProducto = require("../controllers/controllerProducto")

router.get("/",ensureAuthenticated, controllerProducto.getAge18);

module.exports = router;
