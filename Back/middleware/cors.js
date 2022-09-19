
const corsMiddleware = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://marshrutka.su/')
  res.header('Access-control-Allow-Headers', 'https://marshrutka.su/')
  next();
}

module.exports = corsMiddleware