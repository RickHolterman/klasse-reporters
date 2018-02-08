var mongoose = require('mongoose');
var passport = require('passport');

require('./userModel');
require('../../middleware/passport');
require('../mainController.js')();

var User = mongoose.model('User');

dbConnect();

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {

    var response; // JSON to send as response
    var status; // HTTP status code to return

    if (
        req.body.name == null || req.body.name == "" || 
        req.body.email == null || req.body.email == "" ||
        req.body.password == null || req.body.password == ""
    ) {
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

            // TODO: add more validation (password not good enough etc.)
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

    passport.authenticate('local', function(err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token" : token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};

module.exports.profileRead = function(req, res) {

    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) {
        res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    } else {
        // Otherwise continue
        User.findById(req.payload._id).exec(function(err, user) {
            res.status(200).json(user);
        });
    }
};
