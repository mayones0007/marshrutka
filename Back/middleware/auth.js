const jwt = require('jsonwebtoken')
const config = require('../config/default.json')

const authMiddleware = function (req, res, next) {
  if(req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      
      return res.status(401).json({message: "Нет авторизации"})
    }
    const decoded = jwt.decode(token, config.jwtSecret)
    if (decoded.exp * 1000 < Date.now()) {
      const refreshToken = jwt.sign(
        { userId: decoded.userId },
        config.jwtSecret,
        { expiresIn: '30d' }
      )
      req.user = { userId: decoded.userId, refreshToken: refreshToken }
    } else {
    //const decoded = jwt.verify(token, config.jwtSecret)
      req.user = { userId: decoded.userId }
    }
    next()
  } catch (e) {
    return res.status(401).json({ message: "Нет авторизации" })
  }
}

module.exports = authMiddleware