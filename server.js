const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
require('express-async-errors')

require('dotenv').config()

const authRouter = require('./routes/authRouter')
const quoteRouter = require("./routes/quoteRouter")
const connectDB = require('./utils/db')
const errorHandler = require('./utils/error-handler')
const authenticateUser = require('./utils/authorize-authenticate')
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.get('/authtest', authenticateUser, (req, res) => {
  res.json(req.user)
})
app.use('/api/v1/auth', authRouter)
app.use("/api/v1", quoteRouter)

app.use(errorHandler)

const port = 5050

const startServer = () => {
  app.listen(port, () => {
    connectDB(process.env.MONGO_URL)
    console.log(`server started on port ${port}`);
  })
}

startServer()