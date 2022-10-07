const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

const authMiddleware = function (req, res, next) {
  if(req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(400).json({message: "Для продолжения авторизуйтесь"})
    } 
    try {
      const decoded = jwt.verify(token, config.jwtSecret)
      req.user = { userId: decoded.userId }
    } catch (e) {
      return res.status(401).json({ message: "Для продолжения авторизуйтесь" })
    }
    next()
  } catch (e) {
    return res.status(400).json({ message: "Для продолжения авторизуйтесь" })
  }
}

module.exports = authMiddleware