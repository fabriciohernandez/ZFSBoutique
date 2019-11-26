var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ImagenSchema = new Schema({
  tipo:String,
  size:String,
  precio:String,
  marca:String,
  titulo: String,
  status:Boolean,
  imageUrl: String,
  public_id: String
});

module.exports = mongoose.model("Imagen", ImagenSchema);
