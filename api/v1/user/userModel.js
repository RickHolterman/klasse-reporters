var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../../../config.js');

var UserSchema = new Schema({
	email: {
	    type: String,
	    unique: true,
	    required: true
	},
	name: {
		type: String,
		required: true
	},
	hash: String,
	salt: String,
	groups: [{ // The classes a teacher owns
		title: String,
		current_theme: { 
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Theme' 
		},
		students: [{
			student: { 
				type: mongoose.Schema.Types.ObjectId, 
				ref: 'User'
			},
			active: Boolean
		}]
	}]
});

// Add a salt to the password and hash it afterwards
UserSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

// Validate the supplied password
UserSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.hash === hash;
}

UserSchema.methods.generateJwt = function() {
	var expiration = new Date();
	expiration.setDate(expiration.getDate() + 1);

	return jwt.sign({
		id: this._id,
		name: this.name,
		exp: parseInt(expiration.getTime() / 1000),
	}, config.API_SECRET);
}

mongoose.model('User', UserSchema);
