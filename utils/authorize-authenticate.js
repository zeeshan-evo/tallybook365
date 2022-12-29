const UnauthenticatedError = require("../errors/unauthenticated")
const { verifyToken } = require("./jwt")



async function authenticateUser(req, res, next) {
  const token = req.cookies.authToken

  if (!token) {
    throw new UnauthenticatedError('Authentication is invalid')
  }
  const verifiedToken = await verifyToken(token)
  const { name, role, email, user_id } = verifiedToken
  req.user = { name, role, email, user_id}
  next()
}

module.exports = authenticateUser