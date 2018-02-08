var express = require('express');
var router = express.Router();
var errorHandler = require("./middleware/errorHandler");

var userController = require('./v1/user/userController.js');

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to the Klasse Reporters API' });   
}); 

// router.post('/register', userController.store);
// router.post('/login', userController.login);
// router.get('/profile/:user', userController.register);

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
