const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

const authMiddleware = function (req, res, next) {
  if(req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({massage: "Нет авторизации"})
    }
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ massage: "Нет авторизации" })
  }
}

module.exports = authMiddleware