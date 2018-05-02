var express = require('express');
var router = express.Router();
var errorHandler = require('./middleware/errorHandler');
var config = require('../config.js');
var jwt = require('express-jwt');
var auth = require('./middleware/auth');

var userController = require('./v1/user/userController');
var profileController = require('./v1/profile/profileController');
var themeController = require('./v1/theme/themeController');
var groupController = require('./v1/group/groupController');
var licenceController = require('./v1/licence/licenceController');

// Add middleware to preload user profile
router.param('user', profileController.preloadUserProfile);

// Store a new user
router.post('/register', userController.store);

// Log a user in
router.post('/login', userController.login);

// Get a user by its _id
router.get('/profiles/:user', auth.optional, profileController.show);

// Store a new theme
router.post('/themes', themeController.store);

// Get a theme by its _id
router.get('/themes/:theme', themeController.show);

// Store a new group
router.post('/groups', auth.required, groupController.store);

// Get all groups for logged in user
router.get('/groups', auth.required, groupController.index);

// Get a group by its title
router.get('/groups/:group', auth.required, groupController.show);

// Get a licence by its id
router.get('/licences/:licence', auth.required, licenceController.show);

// Catch all other routes and return appropriate error status codes
router.get('*', function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
router.post('*', function(req, res, next) {
    var err = new Error('Method Not Allowed');
    err.status = 405;
    next(err);
});
router.put('*', function(req, res, next) {
    var err = new Error('Method Not Allowed');
    err.status = 405;
    next(err);
});

router.use(errorHandler);

module.exports = router;
