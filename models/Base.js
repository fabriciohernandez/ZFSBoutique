var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    User_name:{type: String, unique: true},
    Apellido: String,
    Nombre: String,
    Password:String,
    Rol:String,
    Pais:String,
    Direccion:String,
    Telefono: Array,
    Correo:Array,
    N_tarjeta:String,
    Visualiza:{
        Producto: { type: Schema.ObjectId, ref: "Producto" }
    },
    Carro:{
        Producto: { type: Schema.ObjectId, ref: "Producto" },
        total: NumberDecimal()
    }

});

const ProductoSchema = new Schema({
    Codigo: {type: String, unique: true},
    Pantalon: String,
    Camisa: String,
    Zapatos:String,
    Status:String,
    mas_18: String,
    Precio: NumberDecimal(),
    Marca:String,
    Imagen:{
        imagen: { type: Schema.ObjectId, ref: "Imagen" }
    }
    
});

const ImagenSchema = new Schema({
    titulo:String,
    imageUrl: String,
    public_id: String,

});







exports.Usuario = mongoose.model("Usuario", UsuarioSchema);
exports.Producto = mongoose.model("Producto", ProductoSchema);
exports.Imagen = mongoose.model("Imagen", ImagenSchema);
