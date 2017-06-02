const express = require('express');
const app = express();
const path = require('path');
const https = require('https');
const fs = require('fs');

// const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
// const credentials = {key: privateKey, cert: certificate};

const port = process.env.PORT || 3000;

app.server = http.createServer(app);
// app.httpsServer = https.createServer(credentials, app);

app.use(express.static(__dirname + '/dist'));
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.listen(port, function() {
    console.log('Server running on port ', app.get('port'));
});
