var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("shoes", { title: "Shoes" });
});

module.exports = router;
