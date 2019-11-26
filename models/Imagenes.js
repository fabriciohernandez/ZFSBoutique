var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ImagenSchema = new Schema({
  titulo: String,
  imageUrl: String,
  public_id: String
});

module.exports = mongoose.model("Imagen", ImagenSchema);
