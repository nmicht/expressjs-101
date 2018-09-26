exports.validator = require('./validator');

exports.errorHandler = function (err, req, res, next) {
  console.log('Error handler');
  if (err) {
    res.status(err.status || 500).send(err);
  }
}
