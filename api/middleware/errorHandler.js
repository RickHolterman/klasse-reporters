// Return http error status code as JSON
module.exports = function(err, req, res, next) {
	if (req.app.get('env') !== 'development') {
		delete err.stack;
	}
	res.status(err.status || 500)
	res.json(err);
}