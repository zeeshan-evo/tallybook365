const UnauthenticatedError = require("../errors/unauthenticated")
const { verifyToken } = require("./jwt")



async function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided")
  }

  const token = authHeader.split(" ")[1]

  try {
    const verifiedToken = await verifyToken(token)
    const { name, role, email, user_id } = verifiedToken
    req.user = { name, role, email, user_id }
    next()
  } catch (error) {
    throw new UnauthenticatedError("token is invalid")
  }
  
}

module.exports = authenticateUser