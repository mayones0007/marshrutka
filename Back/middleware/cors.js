
const corsMiddleware = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://marshrutka.su/')
  res.header('Access-control-Allow-Headers', 'https://marshrutka.su/')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE')
  res.header('X-Requested-With', 'XMLHttpRequest')

  next();
}

module.exports = corsMiddleware