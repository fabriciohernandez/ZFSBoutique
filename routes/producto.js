var express = require("express");
var router = express.Router();
var Producto = require("../models/Producto");
const { ensureAuthenticated} = require('../config/auth')
//var ControllerProducto = require("../controllers/ControllerProducto");

router.get("/",ensureAuthenticated, (req, res) => {
  res.render("producto", { title: "product" });
});

//router.get('/all', ControllerProducto.getAll);
//router.get('/:id', ControllerProducto.getOneById);

router.post("/add2", async (req, res) => {
  console.log(req.body);

  var { codigo, tipo, status, size, precio, marca } = req.body;

  var newProducto = new Producto({
    Codigo: codigo,
    tipo: tipo,
    Status: status,
    Size: size,
    Precio: precio,
    Marca: marca
  });

  newProducto
    .save()
    .then(product => {
      res.send("Recived");
    })
    .catch(err => {
      res.status(500).send("Error");
    });
});
//router.put('/update', ControllerProducto.update);
//router.delete('/delete', ControllerProducto.deleteById);

module.exports = router;
