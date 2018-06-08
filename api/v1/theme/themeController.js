var mongoose = require('mongoose');

require('./themeModel');

var Theme = mongoose.model('Theme');

module.exports.store = function(req, res) {

    var response; // JSON to send as response
    var status; // HTTP status code to return

    var theme = new Theme();

    theme.header = req.body.header;
    theme.content = req.body.content;
    theme.img_url = req.body.img_url;
    theme.statement.header = req.body.statement.header;
    theme.statement.arguments.pro = req.body.statement.arguments.pro;
    theme.statement.arguments.con = req.body.statement.arguments.con;
    theme.explanation.video_url = req.body.explanation.video_url;
    theme.explanation.header = req.body.explanation.header;
    theme.explanation.content = req.body.explanation.content;
    theme.exercise.video_url = req.body.exercise.video_url;
    theme.exercise.header = req.body.exercise.header;
    theme.exercise.content = req.body.exercise.content;

    theme.save(function(err) {
        if (err) {
            status = 400;
            response = { "error": "Something went wrong" };
        } else {
            status = 200;
            response = theme;
        }
        res.status(status);
        res.json(response);
    });
};

// TODO: Skip this route? --> theme can be retrieved through group's show method
module.exports.show = function(req, res) {

    Theme.findById(req.params.theme, function(err, theme) {
        if (!theme) {
            status = 400;
            response = { "error": "Something went wrong" };
        } else {
            status = 200;
            response = theme;
        }
        res.status(status);
        res.json(response);
    });
}