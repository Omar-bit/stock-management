const jwt = require('jsonwebtoken')
function auth(req, res, next) {
  const token = req.headers.token

  try {
    var decoded = jwt.verify(token, process.env.secret)
    if (!decoded) {
      return res.json({ status: 'ko', data: 'token invalide' })
    }
    req.role = decoded.role
    req.idUser = decoded.idUser
    next()
  } catch (err) {
    return res.json({ status: 'ko', data: 'token invalide' })
  }
}
module.exports = auth
