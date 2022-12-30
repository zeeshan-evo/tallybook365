async function attachCookies(res, token) {
  const sevenday = 1000 * 60 * 60 * 24 * 7
  res.status(202).cookie("authToken", token, {path:'/', sameSite: 'strict', httpOnly: true, expires: new Date(Date.now() + sevenday) }).send("cookie is initialized")
}

module.exports = attachCookies