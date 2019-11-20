const Mongoose= require ("mongoose");

const ProductoSchema = new Mongoose.Schema({
    Codigo: {type: String, unique: true},
    tipo:String,
    Status:Boolean,
    Precio: String,
    Marca:String,
    Imagen:{
        imagen: { type: Mongoose.Schema.ObjectId, ref: "Imagen" }
    }
    
});

exports.Producto = Mongoose.model("Producto", ProductoSchema);