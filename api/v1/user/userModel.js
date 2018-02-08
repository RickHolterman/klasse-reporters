var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new Schema({
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
	salt: String
});

// Add a salt to the password and hash it subsequently
userSchema.methods.setPassword = function(password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// Validate the supplied password
userSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
	var expiration = new Date();
	expiration.setDate(expiration.getDate() + 1);

	return jwt.sign({
		_id: this._id,
		name: this.name,
		exp: parseInt(expiration.getTime() / 1000),
	}, "MY_SECRET");
};
