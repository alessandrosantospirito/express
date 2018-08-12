let express = require('express');
let app = express();
let port = process.env.PORT || 8080;

app.listen(port);
console.log.apply('Server started! At http://localhost: ' + port);