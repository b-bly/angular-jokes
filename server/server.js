var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var jokes = require('./routes/jokes.js'); // serve back static files

app.use(express.static('./server/public'));

// Parse post request (data becomes req.body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/jokes', jokes);
app.use(bodyParser.json());

var port = 5000;

// spinning up the server
app.listen(port, function() {
    console.log('server up on port: ', port);
}); // end spin up server