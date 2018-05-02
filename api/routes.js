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

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to the Klasse Reporters API' });   
}); 

router.post('/register', userController.store);

router.post('/login', userController.login);

router.param('users', profileController.preloadUserProfile);

router.get('/profiles/:user', auth.optional, profileController.show);

router.post('/themes', themeController.store);

router.get('/themes/:theme', themeController.show);

router.post('/groups', auth.required, groupController.store);

router.get('/groups', auth.required, groupController.index);

router.get('/groups/:group', auth.required, groupController.show);

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
