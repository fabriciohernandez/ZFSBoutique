var express = require("express");
var router = express.Router();
const { ensureAuthenticated} = require('../config/auth')

router.get("/", ensureAuthenticated,(req, res) => {
  res.render("women", { title: "WOMEN" });
});

module.exports = router;
