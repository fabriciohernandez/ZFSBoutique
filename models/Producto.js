const Mongoose = require("mongoose");

const ProductoSchema = new Mongoose.Schema({
  tipo: String,
  size: String,
  precio: String,
  marca: String,
  titulo: String,
  status: Boolean,
  imageUrl: String,
  public_id: String
});

module.exports = Mongoose.model("Producto", ProductoSchema);
