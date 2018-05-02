var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.store = function(req, res) {

    var status;
    var response;
    var duplicate;

    // Check if title for group was supplied
    if (!req.body.title) {
        status = 405;
        response = { "error": "We missen nog wat informatie! Weet je zeker dat je alles ingevuld hebt?" };

        res.status(status);
        res.json(response);
    } else {
        // If it was, get logged in user by user id from jwt
        User.findById(req.payload.id, function(err, user) {
            if (user) {
                // If group with same title already exists for this user, duplicate = true
                user.groups.forEach(function(group) {
                    if (group.title == req.body.title) {
                        response = { "error": "Er bestaat al een klas met deze naam" };
                        status = 400;
                        duplicate = true;
                    }
                });
                // If no group with supplied title exists already
                if (!duplicate) {
                    var group = {
                        title: req.body.title
                    }
                    // Append the new group to our user's groups array
                    user.groups.push(group);
                    // And save our changes
                    user.save(function(err) {
                        if (!err) {
                            status = 200;
                            response = user.groups[user.groups.length -1];
                        } else {
                            status = 400;
                            response = { "error": "Er is iets fout gegaan" };
                        }
                        res.status(status);
                        res.json(response);
                    });
                } else {
                    res.status(status);
                    res.json(response);
                }
            } else if (err) {
                status = 400;
                response = { "error": "Er is iets fout gegaan" };
                res.status(status);
                res.json(response);
            }
        });
    }
}

module.exports.index = function(req, res) {

    // Retrieve user by user id from jwt
    User.findById(req.payload.id, function(err, user) {
        if (user) {
            res.status(200);
            res.json(user.groups);
        } else if (err) {
            res.status(400);
            res.json({ "error": "Er is iets fout gegaan" });
        }
    });
}

module.exports.show = function(req, res) {

    var status = 400;
    var response = { "error": "Er is iets fout gegaan" };

    User.findById(req.payload.id).then(function(user) {
        user.groups.forEach(function(group) {

            if (group.title == req.params.group) {
                status = 200;
                response = group;
            }
        });
        res.status(status);
        res.json(response);
    });
}
