const Mongoose= require ("mongoose");

const UserSchema = Mongoose.Schema({
    User_name:{type: String, unique: true},
    Apellido: String,
    Nombre: String,
    Password:String,
    Rol:String,
    Pais:String,
    Direccion:String,
    Telefono: String,
    Correo: String,
    N_tarjeta:Array,
    Carro:{
        Producto: { type: Mongoose.Schema.ObjectId, ref: "Producto" },
        total: String
    }
});

module.exports = Mongoose.model("User", UserSchema);