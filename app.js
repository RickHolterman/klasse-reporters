var express = require('express');
var app = express();
var engines = require('consolidate');
var http = require('http').Server(app);
var feedparser = require('feedparser-promised');
var util = require('util');
var path = require('path');
var apiRouter = require("./api/routes");

app.use(express.static(path.join(__dirname, 'dist')));

// Let our api router take care of all routes with api/v1 prefix
app.use('/api/v1', apiRouter);

// Make sure angular takes care of all other routes
app.get('*', function(req, res){
  	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

http.listen(3000, function()
{
  	console.log('listening on *:3000');
});