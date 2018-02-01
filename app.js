var express = require('express');
var app = express();
var engines = require('consolidate');
var http = require('http').Server(app);
var feedparser = require('feedparser-promised');
var util = require('util'); // to log objects completely
const path = require('path');
 
var url = 'http://feeds.nos.nl/jeugdjournaal';
var items;
 
feedparser.parse(url).then( (items) => {
  items.forEach(item => console.log(util.inspect(item, false, null)));
}).catch(error => console.error('error: ', error));

app.use(express.static(path.join(__dirname, 'dist')));

// Routes
app.get('*', function(req, res){
  	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

http.listen(3000, function()
{
  	console.log('listening on *:3000');
});