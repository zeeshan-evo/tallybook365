const BadRequestError = require("../errors/bad-request")
const NotFoundError = require("../errors/not-found")
const Quote = require("../models/quoteModel")

async function createQuote(req, res) {
  
  const {
    user_id,
    client_id,
    client_name,
    client_address,
    title,
    job_no,
    date,
    items,
    t_and_c,
    bank_account,
    bank_name_address,
    swift,
    routing_no,
    brand,
    job_type,
    grand_total
  } = req.body

  const quote = await Quote.create({
    user_id,
    client_id,
    client_name,
    client_address,
    title,
    job_no,
    date,
    items,
    t_and_c,
    bank_account,
    bank_name_address,
    swift,
    routing_no,
    brand,
    job_type,
    grand_total
  })

  if (quote) {
    console.log(quote)
    return res.status(201).json({ msg: "quote inserted", data: quote })
  } else {
    throw new BadRequestError("failed to create new quote, try again")
  }
}

async function getAllQuotes(req, res) {
  const { user_id, role } = req.user
  
  if (role === "admin") {
    const quotes = await Quote.find({})
    if (quotes) {
      return res.status(200).json(quotes)
    }
    throw new NotFoundError(`quotes not found ( role is ${role})`)
  }

  if (role === "user") {
    const quotes = await Quote.find({ user_id: user_id })
    if (quotes) {
      return res.status(200).json(quotes)
    }
    throw new NotFoundError(`quotes not found ( role is ${role})`)
  }
}

async function getQuote(req, res) {
  const { id } = req.params
  console.log(typeof(id));
  const quote = await Quote.findOne({_id: id})
  console.log(quote)
  if (quote) {
    return res.status(200).json(quote)
  }
  throw new NotFoundError("quote with particular id not found")
}

async function updateQuote(req, res) {
  const { id } = req.params
  
  const quote = await Quote.findOneAndUpdate({ _id: id }, req.body, { new: true })
  
  if (quote) {
    return res.status(200).json({msg: "quote successfully updated", data: quote})
  }
  throw new BadRequestError("couldn't update quote, sorry :(")
}

async function deleteQuote(req, res) {
  const { id } = req.params
  console.log(typeof (id))
  const quote = await Quote.findOneAndDelete({ _id: id })
  
  if (quote) {
    return res.status(200).json({msg: "quote deleted", data: quote})
  }
  throw new NotFoundError("quote with particular id was not found")
}
module.exports = { createQuote, getAllQuotes, getQuote, deleteQuote, updateQuote }