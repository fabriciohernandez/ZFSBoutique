var express = require("express");
var router = express.Router();
var controllerProducto = require("../controllers/controllerProducto")
const { ensureAuthenticated} = require('../config/auth')

router.get("/",ensureAuthenticated, (req, res) => {
  res.render("producto", { title: "producto" });
});

//AGREGAR PRODUCTO
router.post("/agregar", controllerProducto.insert);


//router.delete('/delete', ControllerProducto.deleteById);

module.exports = router;
