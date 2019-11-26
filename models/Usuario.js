const Mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UsuarioSchema = Mongoose.Schema({
  User_name: {
    type: String,
    trim: true
  },
  Apellido: String,
  Nombre: String,

  Password: {
    type: String,
    required: true,
    minLength: 7
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  Password: String,
  eded: String,

  Rol: String,
  Pais: String,
  Direccion: String,
  Telefono: String,
  Correo: {
    type: String,
    equired: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    }
  },
  Correo: Array,
  N_tarjeta: Array,
  Carro: {
    Producto: {
      type: Mongoose.Schema.ObjectId,
      ref: "Producto"
    },
    total: String
  }
});

//Definiendo las pre saves functions

UsuarioSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("Password")) {
    user.Password = await bcrypt.hash(user.Password, 8);
  }
  next();
});

UsuarioSchema.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

UsuarioSchema.statics.findByCredentials = async (Correo, Password) => {
  // Search for a user by email and password.
  const user = await Usuario.findOne({ Correo }).exec();
  if (!user) {
    return false;
  }
  const isPasswordMatch = await bcrypt.compare(Password, user.Password);
  if (!isPasswordMatch) {
    return false;
  }
  return user;
};

const Usuario = Mongoose.model("Usuario", UsuarioSchema);
module.exports = Usuario;
