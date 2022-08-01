
const corsMiddleware = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-control-Allow-Headers', 'Content-Type');
  next();
}

module.exports = corsMiddleware