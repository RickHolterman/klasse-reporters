var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.show = function(req, res, next) {
    // TODO: Additional error trapping
    if (req.payload) { // if logged in
        User.findById(req.payload.id).then(function(user) {
            if (!user) {
                return res.sendStatus(401);
            }
            // if user requests own profile
            if (req.payload.id == req.profile.id) {
                return res.status(200).json({
                    name: req.profile.name,
                    email: req.profile.email,
                    opdrachten: "Deze zijn privé"
                });
            } else { // don't show private stuff
                res.status(200).json({
                    name: req.profile.name,
                    email: req.profile.email
                });
            }
        });
    } else { // if not logged in (because no jwt)
        return res.status(401).json({
            "message" : "UnauthorizedError: private profile"
        });
    }
}

// Middleware to preload user profile; accessible through req.profile
module.exports.preloadUserProfile = function(req, res, next, user) {
    User.findById(user)
    .then(function(user) {
        if (!user) {
            return res.sendStatus(404);
        }
        req.profile = user;
        return next();
    }).catch(next);
}