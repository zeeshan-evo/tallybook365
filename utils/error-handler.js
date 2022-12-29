function errorHandler(err, req, res, next) {
  console.log(err.message);
  res.status(err.statusCode).json({ msg: err.message })
}

module.exports = errorHandler