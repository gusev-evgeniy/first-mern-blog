const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../confige/confige')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, jwtSecret)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Auth errorr' })
  }
}