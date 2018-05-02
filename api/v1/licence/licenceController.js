var mongoose = require('mongoose');

require('./licenceModel');

var Licence = mongoose.model('Licence');

module.exports.show = function(req, res) {

    Licence.findById(req.params.licence)
    .populate('themes')
    .exec(function(err, licence) {
        if (licence) {
            res.status(200);
            res.json(licence);
        } else if (err) {
            res.status(400);
            res.json({ "error": "Er is iets fout gegaan" });            
        }
    });
}
