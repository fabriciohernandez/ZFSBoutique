var mongoose = require("mongoose");
var Producto = require("../models/Producto");
var cloudinary = require("cloudinary");
const Usuario = require("../models/Usuario");


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var fs = require("fs-extra");

//INSERT
module.exports.insert = (req, res) => {
  console.log(req.body);
  console.log(req.file);
  var { tipo, size, precio, marca, titulo, status } = req.body;
  var saveImageDb = (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error");
    }
    var newProducto = new Producto({
      tipo: tipo.toUpperCase(),
      size: size,
      precio: precio,
      marca: marca,
      titulo: titulo,
      status: status,
      imageUrl: result.url,
      public_id: result.public_id
    });

    newProducto
      .save()
      .then(producto => {
        fs.unlink(req.file.path);
        req.flash('success_msg','Su producto se añadió correctamente, puedes verificar en la sección de TODO');
        res.redirect('/producto')
      })
      .catch(err => {
        console.log(err)
        res.status(500).send(err.message);
      });
  };
  cloudinary.v2.uploader.upload(req.file.path, saveImageDb);
};

//DELETE BY ID
module.exports.deleteById = (req, res) => {
  let producto = req.body;

  if (!producto._id) {
    return res.status(400).json({
      message: "Code needed"
    });
  }

  Producto.deleteOne({ _id: producto._id })
    .then(deleted => {
      res.status(200).json({
        message: "Delete product was successful"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Something happend try again"
      });
    });
};

//GET ALL
module.exports.getAll = async (req, res) => {
  try {
    const productos = await Producto.find()
    //res.json(canales)
    var cant = productos.length

    res.render('all',{arreglo:productos, cant:cant})
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}

module.exports.getWomen = async (req, res) => {
  try {
    const productos = await Producto.find({tipo: 'MUJER'})
    //res.json(canales)
    var cant = productos.length

    res.render('women',{arreglo:productos, cant:cant})
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}

module.exports.getMen = async (req, res) => {
  try {
    const productos = await Producto.find({tipo: 'HOMBRE'})
    //res.json(canales)
    var cant = productos.length

    res.render('men',{arreglo:productos, cant:cant})
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}
module.exports.getShoes = async (req, res) => {
  try {
    const productos = await Producto.find({tipo: 'ZAPATOS'})
    //res.json(canales)
    var cant = productos.length

    res.render('shoes',{arreglo:productos, cant:cant})
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}
module.exports.getAge18 = async (req, res) => {
  try {
    const productos = await Producto.find({tipo: '+18'})
    var cant = productos.length

    res.render('age18',{arreglo:productos, cant:cant})
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}

module.exports.getCarrito = async (req, res) => {
  try {
    let carrito=[]
    let subtotal = 0
    for (var x = 0; x < req.user.Carro.length; x++){
      productos = await Producto.findOne({_id: req.user.Carro[x]})
      subtotal = subtotal + parseFloat(productos.precio)
      carrito.push(productos)
    }


    res.render('checkout', {arreglo: carrito, cant: carrito.length, total: subtotal})
  }
  catch (err){
    res.status(500).json({message: err.message})
  }
}

module.exports.pagar = async (req, res) => {
  try {
    req.user.Carro = []
    let usuario = req.user
    console.log(req.user)
    if (!usuario._id) {
      return res.status(400).json({
        message: "Something happend try again"
      });
    }

    Usuario.updateOne({ _id: usuario._id }, usuario)
      .then(value => {
        req.flash("success_msg", "Orden pagada");
        return res.render('ordenLista')
      })
      .catch(err => {
        return res.redirect("/home");
      });
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: `There is no one with product`
    });
  }


}