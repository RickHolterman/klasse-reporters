var mongoose = require('mongoose');
var User = mongoose.model('User');

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