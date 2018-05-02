var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.store = function(req, res) {

    var status;
    var response;
    var duplicate;

    if (!req.body.title) {
        status = 405;
        response = { "error": "We missen nog wat informatie! Weet je zeker dat je alles ingevuld hebt?" };

        res.status(status);
        res.json(response);
    } else {
        User.findById(req.payload.id).then(function(user) {

            if (user) {

                user.groups.forEach(function(group) {
                    if (group.title == req.body.title) {
                        response = { "error": "Er bestaat al een klas met deze naam" };
                        status = 400;
                        duplicate = true;
                    }
                });

                if (!duplicate) {
                
                    var group = {
                        title: req.body.title
                    }

                    user.groups.push(group);

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
                }
            }
            res.status(status);
            res.json(response);
        });
    }
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
