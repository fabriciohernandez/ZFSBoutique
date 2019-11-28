var Usuario = require('../models/Usuario');
var Producto = require('../models/Producto');

//API USUARIO
module.exports.getAllLocal = async (req, res) => {
  try {
    const usuario = await Usuario.find()
    res.json(usuario)
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}

module.exports.createOneLocal = async (req, res) => {
  const usuario = new Usuario(req.body)
  try {
    const newUsuario = await usuario.save()
    res.status(201).json(newUsuario)
  }
  catch (err){
    res.status(400).json({message: err.message})
  }
}

module.exports.deleteOneLocal = async (req, res) => {
  try {
    await Usuario.findOneAndDelete({_id: req.params.id})
    res.json({message: 'Usuario borrado'})
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}

module.exports.updateLocal = async (req, res) =>{
  if (req.body.User_name!=null) {
    res.usuario.User_name = req.body.User_name
  }
  if (req.body.Nombre!=null) {
    res.usuario.Nombre = req.body.Nombre
  }
  if (req.body.edad!=null) {
    res.usuario.edad = req.body.edad
  }
  if (req.body.Rol!=null) {
    res.usuario.Rol = req.body.Rol
  }
  if (req.body.Pais!=null) {
    res.usuario.Pais = req.body.Pais
  }
  if (req.body.Direccion!=null) {
    res.usuario.Direccion = req.body.Direccion
  }
  if (req.body.Telefono!=null) {
    res.usuario.Telefono = req.body.Telefono
  }

  try {
    const updatedUsuario = await res.usuario.save()
    res.json(updatedUsuario)
  } catch (e) {
    res.status(400).json({message: e.message})
  }
}

//API PRODUCTO
module.exports.getAllProductLocal = async (req, res) => {
    try {
      const producto = await Producto.find()
      res.json(producto)
    }
    catch (err){
      res.status(500).json({message: err.message})
    }
  }
  
  module.exports.createOneProductLocal = async (req, res) => {
    const producto = new Producto(req.body)
    try {
      const newProducto = await producto.save()
      res.status(201).json(newProducto)
    }
    catch (err){
      res.status(400).json({message: err.message})
    }
  }
  
  module.exports.deleteOneProductLocal = async (req, res) => {
    try {
      await Producto.findOneAndDelete({_id: req.params.id})
      res.json({message: 'producto borrado'})
    }
    catch (err){
      res.status(500).json({message: err.message})
    }
  }
  
  module.exports.updateProductLocal = async (req, res) =>{
    if (req.body.tipo!=null) {
      res.producto.tipo = req.body.tipo
    }
    if (req.body.size!=null) {
        res.producto.size = req.body.size
    }
    if (req.body.precio!=null) {
        res.producto.precio = req.body.precio
    }
    if (req.body.marca!=null) {
        res.producto.marca = req.body.marca
    }
    if (req.body.titulo!=null) {
        res.producto.titulo = req.body.titulo
    }
    if (req.body.status!=null) {
        res.producto.status = req.body.status
    }
  
    try {
      const updatedProducto = await res.producto.save()
      res.json(updatedProducto)
    } catch (e) {
      res.status(400).json({message: e.message})
    }
  }