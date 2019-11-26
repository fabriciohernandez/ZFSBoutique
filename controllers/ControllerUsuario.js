var Mongoose = require("mongoose");
const Usuario = require("../models/Usuario");


//triggers??????

//INSERT
const insert = async (req, res) => {
  try {
    const { User_name, Correo, Password, RPassword } = req.body;
    let usuario = new Usuario(req.body);

    //verificar las contrasenas
    if (Password !== RPassword) {
      res.render("register", { error1: 'Las contrasenas no coinciden.' });
    } else {
      await usuario.save();
      const token = await usuario.generateAuthToken();
      res.render("login", {
        title: "login",
        message: usuario.User_name
      });
      //res.status(201).send({usuario,token})
    }
  } catch (error) {
    res.render("register", { error1: "El usuario y el correo estan en uso." });
  }
};

const login = async (req, res) => {
  try {
    const { Correo, Password } = req.body;
    const user = await Usuario.findByCredentials(Correo, Password);

    if (!user) {
      req.flash('error_msg','Credenciales incorrectas')
      return res.redirect("/login");
    }

    const token = await user.generateAuthToken();

  } catch (error) {
    console.log(error);
    res.redirect(301, "/login");

    //res.render('login', { title: 'login' , message: 'Error, Reredivisa el usuario y la contraseña ingresada'});
  }
};
//UPDATE
const update = (req, res) => {
  let usuario = req.body;

  if (!usuario._id) {
    return res.status(400).json({
      message: "Something happend try again"
    });
  }

  Usuario.update({ _id: usuario._id }, usuario)
    .then(value => {
      res.status(200).json({
        message: "Update was successful"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Something happend trying to update "
      });
    });
};

//DELETE BY ID
const deleteById = (req, res) => {
  let usuario = req.body;

  if (!usuario._id) {
    return res.status(400).json({
      message: "Username needed"
    });
  }

  Usuario.deleteOne({ _id: usuario._id })
    .then(deleted => {
      res.status(200).json({
        message: "Delete User was successful"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Something happend try again"
      });
    });
};

//GET ALL
const getAll = (req, res) => {
  Usuario.find((err, usuarios) => {
    if (err)
      return res.status(500).json({
        message: "Something happend trying to get the users"
      });

    if (usuarios) {
      res.status(200).json(usuarios);
    } else {
      res.status(404).json({
        message: "There isn't any user"
      });
    }
  });
};

//GET BY ID
const getOneById = (req, res) => {
  let id = req.params.id;

  Usuario.findById(id, (err, usuario) => {
    if (err)
      return res.status(500).json({
        message: "Something happend try again"
      });

    if (usuario) {
      res.location("/" + inst._id);
    } else {
      res.status(404).json({
        message: `There is no one with username ${id}`
      });
    }
  });
};

module.exports = {
  insert,
  login,
  update,
  deleteById,
  getAll,
  getOneById
};
