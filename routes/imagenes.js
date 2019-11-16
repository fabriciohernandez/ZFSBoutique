var express = require('express');
var router = express.Router();
var Imagen = Imagen;
var cloudinary = require('cloudinary');

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
});
var fs = require('fs-extra');

//Esto nos puede servir si queremos listar la imagenes subidas nos servira 
//para eliminar o ver todas la fotos
router.get ('/', async (req,res) =>{
   var photo= await Imagen.find();
 res.render('images', {photo})
});

//ruta del formulario par subir las imagenes ('images_form')

router.get('/images/add',(req,res)=>{
   res.render('image_form')
});

router.post('/images/add' ,async(req,res)=>{
    var{titulo} = req.body;
    var result = await cloudinary.v2.uploader.upload(req.file.path);

    var newImagen = new Imagen({
      titulo: titulo,
      imageUrl: result.url,
      public_id: result.public_id
    });

   await newImagen.save();
   await fs.unlink(req.file.path)
   res.send('Received');
   
 });



module.exports = router;
