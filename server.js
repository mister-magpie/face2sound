var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static'));
app.use('/js', express.static(__dirname + '/node_modules/tone/build/')); // redirect bootstrap JS

app.get('/', function (req, res) {
   res.sendfile('index2.html');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
