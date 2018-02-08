var mongoose = require('mongoose');
var config = require('../../config.js');

module.exports = function() { 
	//Connect to our database
	dbConnect = function() {
		mongoose.connect(config.CONN_STRING); // Connect to our database
	}
}
