const BadRequestError = require('../errors/bad-request');
const User = require('../models/authModel');
// const attachCookies = require('../utils/cookies');
const { createJWT } = require('../utils/jwt');
const { hashPassword, comparePassword } = require('../utils/password')

async function register(req, res) {
  const { name, email, password, user_id } = req.body;
  
  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new BadRequestError("User with this email is already signed up")
  }
  
  
  if (!name || !password || !email) {
    throw new BadRequestError("please provide all necessary fields")
  }

  const hashedPassword = await hashPassword(password); 
  const user = await User.create({ user_id, name, email, password: hashedPassword }); 
  
  const tokenUser = { name: user.name, role: user.role, email: user.email, user_id: user_id }; 
  const token = await createJWT(tokenUser);
  // await attachCookies(res, token)
  res.status(201).json({ token, msg: 'user successfully registered', user: tokenUser }); 
}

async function login(req, res) {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new BadRequestError("please provide all necessary fields")
  }

  const storedUser = await User.findOne({ email });
  console.log(storedUser);
  if (!storedUser) {
    throw new BadRequestError("user with this email doesn't exist")
  }

  const tokenUser = { user_id: storedUser.user_id, name: storedUser.name, role: storedUser.role, email: storedUser.email };

  const isCorrect = await comparePassword(password, storedUser.password);

  if (isCorrect) {
    const token = await createJWT(tokenUser);
    // await attachCookies(res,token)
    return res.status(201).json({ token, msg: 'user successfully logged in', user: tokenUser});
  } else {
    return res.status(401).json({ msg: 'unauthorized' });
  }
}

async function logout(req, res) {
  // res.cookie('authToken', 'loggedout', {expires: new Date(Date.now())})
  res.status(200).json({ msg: 'user successfully logged out' });
}

module.exports = {register,login,logout}
