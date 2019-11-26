var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("age18", { title: "+18" });
});

module.exports = router;
