var express = require('express');
var router = express.Router();
var Imagen = require('../models/Imagenes')
var cloudinary = require('cloudinary');

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
});
var fs = require('fs-extra');

//Esto nos puede servir si queremos listar la imagenes subidas nos servira 
//para eliminar o ver todas la fotos
router.get('/', async (req, res) => {
   var photo = await Imagen.find();
   console.log(photo);
   res.render('images', {
      photo
   })
});

//ruta del formulario par subir las imagenes ('images_form')

router.get('/add', (req, res) => {
   res.render('image_form.pug')
});

router.post('/add', async (req, res) => {

   console.log(req.body);
   console.log(req.file);
   var {
      titulo
   } = req.body;
   var result = await cloudinary.v2.uploader.upload(req.file.path);
   console.log(result);
   var newImagen = new Imagen({
      titulo: titulo,
      imageUrl: result.url,
      public_id: result.public_id
   });

   await newImagen.save();
   await fs.unlink(req.file.path)
   res.send('Received');

});


router.post('/add2', async (req, res) => {

   console.log(req.body);
   console.log(req.file);
   var {
      titulo
   } = req.body;
   var saveImageDb = (error, result) => {
      if (error) {
         console.log(error);
         return res.status(500).send("Error");
   }
      var newImagen = new Imagen({
         titulo: titulo,
         imageUrl: result.url,
         public_id: result.public_id
      });

      newImagen.save()
         .then(image => {
            fs.unlink(req.file.path);
            res.send("Recived")
         }).catch(err => {
            res.status(500).send("Error");
         })
   }
   cloudinary.v2.uploader.upload(req.file.path, saveImageDb);

});


module.exports = router;