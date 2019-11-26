var express = require("express");
var router = express.Router();
const ControllerUsuario = require("../controllers/ControllerUsuario");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  res.render("login", { title: "login" });
});

router.post("/", ControllerUsuario.login);

module.exports = router;
