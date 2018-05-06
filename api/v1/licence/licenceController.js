var mongoose = require('mongoose');

require('./licenceModel');
require('../user/userModel');

var Licence = mongoose.model('Licence');
var User = mongoose.model('User');

module.exports.show = function(req, res) {

    if (req.params.licence) {
        Licence.findById(req.params.licence)
        .populate('themes')
        .exec(function(err, licence) {
            if (licence) {
                // TODO: Check if licence == active
                // TODO: Check if expiration date is valid still
                res.status(200);
                res.json(licence);
            } else if (err) {
                res.status(400);
                res.json({ "error": "Er is iets fout gegaan" });            
            }
        });
    } else {
        User.findById(req.payload.id)
        .exec(function(err, user) {
            if (user) {
                Licence.findOne({ "email": user.email })
                .populate('themes')
                .select('-code -_id')
                .exec(function(err, licence) {
                    if (licence) {
                        // TODO: Check if licence == active
                        // TODO: Check if expiration date is valid still
                        res.status(200);
                        res.json(licence);
                    } else if (err) {
                        res.status(400);
                        res.json({ "error": "Er is iets fout gegaan" });            
                    }
                }); 
            } else if (err) {
                res.status(400);
                res.json({ "error": "Er is iets fout gegaan" });            
            }
        });
    }  
}

// TODO: goede api routes maken voor de reoutes die show hebben maar deze niet met id ophalen.
// Dit zijn geen show functions maar index met url parameters die sorteren op naam (groep-8)
