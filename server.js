let express = require("express");
let app = express();
let port = process.env.PORT || 8080;

app.get("/", function(req, res) {
  res.send("root");
});

app.get("/about", function(req, res) {
  res.send("about");
});

app.listen(port);
console.log("Server started! At http://localhost:" + port);
