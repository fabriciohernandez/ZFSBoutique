var express = require("express");
var router = express.Router();
const { ensureAuthenticated} = require('../config/auth')

router.get("/",ensureAuthenticated, (req, res) => {
  res.render("age18", { title: "+18" });
});

module.exports = router;
