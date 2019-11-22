const Mongoose= require ("mongoose");

const UsuarioSchema = Mongoose.Schema({
    User_name:{type: String, required: true, unique: true},
    Apellido: String,
    Nombre: String,
    Password: String,
    eded:String,
    Rol: String,
    Pais: String,
    Direccion: String,
    Telefono: String,
    Correo: {type: String, required: true},
    N_tarjeta: Array,
    Carro:{
        Producto: { type: Mongoose.Schema.ObjectId, ref: "Producto" },
        total: String
    }
});

module.exports = Mongoose.model("Usuario", UsuarioSchema);