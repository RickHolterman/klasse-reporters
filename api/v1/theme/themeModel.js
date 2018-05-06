var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ThemeSchema = new Schema({
	header: String,
	content: String,
	img_url: String,
	statement: {
		header: String,
		arguments: {
			pro: [{ 
				argument: String,
				_id: false
			}],
			con: [{ 
				argument: String,
				_id: false
			}]
		}
	},
	explanation: {
		video_url: String,
		header: String,
		content: String
	},
	exercise: {
		video_url: String,
		header: String,
		content: String
	}
});

mongoose.model('Theme', ThemeSchema);
