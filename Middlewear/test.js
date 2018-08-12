const specific = function(req, res, next) {
  console.log("Reacting to all connections regarding '/'");
  next();
};

const alwaysListening = function(req, res, next) {
  console.log("I'm always listening!");
  next();
};

const requestTime = function(req, res, next) {
  req.time = Date.now();
  req.name = "Bert";
  next();
};

const modifyName = function(req, res, next, name) {
  let modified = name + "-dude";

  req.name = modified;

  next();
};

module.exports = {
  specific,
  alwaysListening,
  requestTime,
  modifyName
};
