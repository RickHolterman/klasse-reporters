var mongoose = require('mongoose');
var passport = require('passport');

require('./userModel');
require('../../middleware/passport');

var User = mongoose.model('User');

module.exports.store = function(req, res) {

    var response; // JSON to send as response
    var status; // HTTP status code to return

    // TODO: check individual fields and return specific error messages
    if (!req.body.name || !req.body.email || !req.body.password) {
        status = 405;
        response = { "error": "We missen nog wat informatie! Weet je zeker dat je alles ingevuld hebt?" };

        res.status(status);
        res.json(response);
    } else {
        var user = new User();

        user.name = req.body.name;
        user.email = req.body.email;

        user.setPassword(req.body.password);

        user.save(function(err) {

            // TODO: add more validation (password not strong enough etc.)
            if (err) {
                if (err.code == 11000) {
                    response = { "error": "Er bestaat al een Klasse Reporter met het e-mailadres dat je hebt ingevuld!" };
                } else {
                    response = { "error": "Er is iets fout gegaan." };
                }
                status = 400;
            } else {
                var token;
                token = user.generateJwt();
                response = { "token": token };
                status = 200;
            }
            res.status(status);
            res.json(response);
        });
    } 
};

module.exports.login = function(req, res) {

    var response; // JSON to send as response
    var status; // HTTP status code to return

    // TODO: check individual fields and return specific error messages
    if (
        req.body.email == null || req.body.email == "" ||
        req.body.password == null || req.body.password == ""
    ) {
        status = 405;
        response = { "error": "We missen nog wat informatie!" };

        res.status(status);
        res.json(response);
    } else {
        passport.authenticate('local', function(err, user, info) {
            var token;

            // If Passport throws/catches an error
            if (err) {
                status = 404;
                response = err;
            }
            // If a user is found
            if (user) {
                token = user.generateJwt();
                status = 200;
                response = { "token": token };
            } else {
                // If user is not found
                status = 401;
                response = info;
            }
            res.status(status);
            res.json(response);
        })(req, res);
    }
};
