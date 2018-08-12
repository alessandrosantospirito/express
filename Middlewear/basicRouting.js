let express = require("express");
let router = express.Router();

//express.Router is middlewear and routing in one
router.use(function timeLog(req, res, next) {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  console.log("Time: ", hours + " : " + minutes);
  next();
});

router.get("/", function(req, res) {
  res.send("The homepage");
});

router.get("/about", function(req, res) {
  res.send("The about part");
});

module.exports = router;
