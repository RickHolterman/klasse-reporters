var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LicenceSchema = new Schema({
	email: String,
	code: String,
	themes: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Theme'
	}]
});

mongoose.model('Licence', LicenceSchema);
