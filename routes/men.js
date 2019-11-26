var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("men", { title: "MEN" });
});

module.exports = router;
