
const corsMiddleware = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')

  next();
}

module.exports = corsMiddleware