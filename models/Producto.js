var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ProductoSchema = new Schema({
  Tipo:String,
  Status:Boolean,
  Size:String,
  Precio: String,
  Marca:String,
  Titulo:String,
  imageUrl:String,
  public_id: String,
});

module.exports = mongoose.model("Producto", ProductoSchema);
