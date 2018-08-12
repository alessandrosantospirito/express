let express = require("express");
let app = express();
let port = process.env.PORT || 8080;
let mw = require("./Middlewear/test.js");
let standardWeb = require("./Middlewear/basicRouting");

var bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//Specific Website
app.use("/birds", standardWeb);

app.use("/", standardWeb);

//Middlewear
//-------------------------------

//All listens to all requests on the specific path
app.all("/", mw.specific);

//With no path it reacts to everything
app.use(mw.alwaysListening);

app.use(mw.requestTime);

//Reacts to everything with "name" in it
app.param("name", mw.modifyName);

//Get- working with regex
//-------------------------------
app.get("/", function(req, res) {
  res.send("root");
});

//Getting the information from the middlewear "requestTime"
app.get("/time", function(req, res) {
  res.send(req.name + " askes at: " + req.time);
});

//Name form Http request with middlewear inbetween
app.get("/catchingname/:name", function(req, res) {
  res.send("Also I react to the name " + req.name);
});

//Same
app.get("/api/users/:name", function(req, res) {
  res.send("Whats is up " + req.name + "!");
});

//<?id=...&token=...&id=...>
app.get("/api/users", function(req, res) {
  let user_id = req.param("id");
  let token = req.param("token");
  let geo = req.param("geo");

  res.send(user_id + " " + token + " " + geo);
});

//Using the http request for information
//<?name=Nagobert&age=50> or simply postman
app.get("/multyParameters", function(req, res) {
  let user_name = req.param("name");
  let user_age = req.param("age");

  res.send(user_name + " is at the age of " + user_age);
});

//Post
//-------------------------------
app.post("/", function(req, res) {
  res.send("Sucessfull");
});

//Use bodyParser to get body information
app.post("/multyParameters", function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }
  let user_name = req.body.name;
  let user_age = req.body.age;

  res.send(user_name + " " + user_age);
});

//Routes
app
  .route("/login")

  .get(function(req, res) {
    res.send("this is the login form");
  })

  .post(function(req, res) {
    res.send("Processing");
  });

//Starting port
app.listen(port);
console.log("Server started! At http://localhost:" + port);
