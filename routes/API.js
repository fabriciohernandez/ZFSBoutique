var express = require('express');
var router = express.Router();
var apiController = require('../controllers/controllerApi')

var Usuario = require('../models/Usuario');
var Producto = require('../models/Producto');

//--------------USUARIO------------------

//GET all
router.get('/usuario', apiController.getAllLocal);

//Register new user
router.post('/usuario',apiController.createOneLocal);

//get user info
router.get('/usuario/:id',getUsuario,(req,res) => {
  res.send(res.usuario)
});

//Updating user
router.patch('/usuario/:id',getUsuario, apiController.updateLocal);

//delete user
router.delete('/usuario/:id',getUsuario, apiController.deleteOneLocal);


//middleware function VERIFICA SI EL USUARIO EXISTE 
async function getUsuario(req, res, next){
  let usuario
  try {
    usuario = await Usuario.findById(req.params.id)
    if(usuario == null){
      return res.status(404).json({message: 'usuario no encontrado'})
    }
  }
  catch (err)
  {
    return res.status(500).json({message: err.message})
  }

  res.usuario = usuario
  next()
}

//---------------------------------------------

//--------------PRODUCTO------------------

//GET all
router.get('/producto', apiController.getAllProductLocal);

//Register new user
router.post('/producto',apiController.createOneProductLocal);

//get user info
router.get('/producto/:id',getproducto,(req,res) => {
  res.send(res.producto)
});

//Updating user
router.patch('/producto/:id',getproducto, apiController.updateProductLocal);

//delete user
router.delete('/producto/:id',getproducto, apiController.deleteOneProductLocal);


//middleware function VERIFICA SI EL USUARIO EXISTE 
async function getproducto(req, res, next){
  let producto
  try {
    producto = await Producto.findById(req.params.id)
    if(producto == null){
      return res.status(404).json({message: 'producto no encontrado'})
    }
  }
  catch (err)
  {
    return res.status(500).json({message: err.message})
  }

  res.producto = producto
  next()
}

//---------------------------------------------

module.exports = router;