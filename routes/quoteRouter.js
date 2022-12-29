const express = require("express")
const { createQuote, getAllQuotes, getQuote, deleteQuote, updateQuote } = require("../controllers/quoteController")
const authenticateUser = require("../utils/authorize-authenticate")
const quoteRouter = express.Router()

quoteRouter.post("/quotes", authenticateUser, createQuote)
quoteRouter.get("/quotes", authenticateUser, getAllQuotes)
quoteRouter.get("/quotes/:id", authenticateUser, getQuote)
quoteRouter.delete("/quotes/:id", authenticateUser, deleteQuote)
quoteRouter.patch("/quotes/:id", updateQuote)

module.exports = quoteRouter