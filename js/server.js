var connect = require('connect');
var serveStatic = require('serve-static');

var port = 5000;

var app = connect();

app.use(serveStatic("../"));
app.listen(port);

console.log('Connected via port '+port);