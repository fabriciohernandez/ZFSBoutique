var express = require("express");
var router = express.Router();
const ControllerUsuario = require("../controllers/ControllerUsuario");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  res.render("register", { title: "register" });
});

router.post("/", ControllerUsuario.insert);

module.exports = router;
