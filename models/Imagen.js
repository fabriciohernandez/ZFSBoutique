const Mongoose= require ("mongoose");
var Schema = Mongoose.Schema;

const ImagenSchema = new Schema({
    titulo:String,
    imageUrl: String,
    public_id: String,

});

module.exports = Mongoose.model("Imagen", ImagenSchema);