const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

const authMiddleware = function (req, res, next) {
  if(req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(400).json({message: "Нет авторизации"})
    } 
    try {
      const decoded = jwt.verify(token, config.jwtSecret)
      req.user = { userId: decoded.userId }
    } catch (e) {
      return res.status(401).json({ message: "Нет авторизации" })
    }
    next()
  } catch (e) {
    console.log(e)
    return res.status(400).json({ message: "Нет авторизации" })
  }
}

module.exports = authMiddleware