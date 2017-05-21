var express = require('express');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/dist'));
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.listen(app.get('port'), function() {
    console.log('Server running on port ', app.get('port'));
});
