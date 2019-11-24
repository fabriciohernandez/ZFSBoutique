const Mongoose= require ("mongoose");
const Imagen = require("../models/Imagenes")

const ProductoSchema = new Mongoose.Schema({
    Codigo: {type: String, unique: true},
    tipo:String,
    Status:Boolean,
    Size:String,
    Precio: String,
    Marca:String,
    Imagen:{
        imagen: { type: Mongoose.Schema.ObjectId, ref: Imagen }
    }
    
});

module.exports = Mongoose.model("Producto", ProductoSchema);