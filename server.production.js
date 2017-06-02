var express = require('express');
var app = express();
var path = require('path');
var https = require('https');

var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const port = process.env.PORT || 3000;

app.server = http.createServer(app);
app.httpsServer = https.createServer(credentials, app);

app.use(express.static(__dirname + '/dist'));
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.listen(port, function() {
    console.log('Server running on port ', app.get('port'));
});
