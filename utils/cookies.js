async function attachCookies(res, token) {
  const sevenday = 1000 * 60 * 60 * 24 * 7
  res.cookie("authToken", token, { expires: new Date(Date.now() + sevenday) }) // httpOnly:true,
}

module.exports = attachCookies