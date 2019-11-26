var express = require('express');
var router = express.Router();
<<<<<<< Updated upstream
const ControllerProducto = require("../controllers/controllerProducto");


router.get('/', ControllerProducto.getAll);
router.get('/:id', ControllerProducto.getOneById);

router.post('/insert', ControllerProducto.insert);

router.put('/update', ControllerProducto.update);

router.delete('/delete', ControllerProducto.deleteById);


=======
var Producto = require("../models/Producto");
var cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var fs = require("fs-extra");

//Esto nos puede servir si queremos listar la imagenes subidas nos servira
//para eliminar o ver todas la fotos
router.get("/", async (req, res) => {
  var product = await Producto.find();
  console.log(product);
  res.render("images", {
    product
  });
});

//ruta del formulario par subir las imagenes ('images_form')

router.get("/add", (req, res) => {
  res.render("image_form.pug");
});

router.post("/add", async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  var { tipo, status, size, precio, marca, titulo } = req.body;
  var result = await cloudinary.v2.uploader.upload(req.file.path);
  console.log(result);
  var newProducto = new Producto({
    Tipo: tipo,
    Status: status,
    Size: size,
    Precio: precio,
    Marca: marca,
    Titulo: titulo,
    imageUrl: result.url,
    public_id: result.public_id
  });

  await newProducto.save();
  await fs.unlink(req.file.path);
  res.send("Received");
});

router.post("/add2", async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  var { tipo, status, size, precio, marca, titulo } = req.body;
  var saveProductoDb = (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error");
    }
    var newProducto = new Producto({
      Tipo: tipo,
      Status: status,
      Size: size,
      Precio: precio,
      Marca: marca,
      Titulo: titulo,
      imageUrl: result.url,
      public_id: result.public_id
    });

    newProducto
      .save()
      .then(Producto => {
        fs.unlink(req.file.path);
        res.send("Recived");
      })
      .catch(err => {
        res.status(500).send("Error");
      });
  };
  cloudinary.v2.uploader.upload(req.file.path, saveProductoDb);
});
>>>>>>> Stashed changes

module.exports = router;
