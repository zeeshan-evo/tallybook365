const BadRequestError = require("../errors/bad-request")
const NotFoundError = require("../errors/not-found")
const Invoice = require("../models/invoiceModel")

async function createInvoice(req, res) {
  const { user_id, client_id, client_name, client_address, title, job_no, date, items, vat, advance, due, grand_total, t_and_c, bank_account, bank_name_address, swift, routing_no, brand, job_type } =
    req.body

  const invoice = await Invoice.create({
    user_id,
    client_id,
    client_name,
    client_address,
    title,
    job_no,
    date,
    items,
    vat,
    advance,
    due,
    grand_total,
    t_and_c,
    bank_account,
    bank_name_address,
    swift,
    routing_no,
    brand,
    job_type
  })

  if (invoice) {
    return res.status(201).json({ msg: "invoice inserted", data: invoice })
  } else {
    throw new BadRequestError("failed to create new invoice, try again")
  }
}

async function getAllInvoices(req, res) {
  const { user_id, role } = req.user

  if (role === "admin") {
    const invoices = await Invoice.find({})
    console.log(invoices, role)
    if (invoices.length > 0) {
      return res.status(200).json(invoices)
    }
    throw new NotFoundError(`invoices not found ( role is ${role})`)
  }

  if (role === "user") {
    const invoices = await Invoice.find({ user_id: user_id })
    console.log(invoices, role)
    if (invoices.length > 0) {
      return res.status(200).json(invoices)
    }
    throw new NotFoundError(`invoices not found ( role is ${role})`)
  }
}

async function getInvoice(req, res) {
  const { id } = req.params
  console.log(typeof id)
  const invoice = await Invoice.findOne({ _id: id })
  console.log(invoice)
  if (invoice) {
    return res.status(200).json(invoice)
  }
  throw new NotFoundError("invoice with particular id not found")
}

async function updateInvoice(req, res) {
  const { id } = req.params

  const invoice = await Invoice.findOneAndUpdate({ _id: id }, req.body, { new: true })

  if (invoice) {
    return res.status(200).json({ msg: "invoice successfully updated", data: invoice })
  }
  throw new BadRequestError("couldn't update invoice, sorry :(")
}

async function deleteInvoice(req, res) {
  const { id } = req.params
  console.log(typeof id)
  const invoice = await Invoice.findOneAndDelete({ _id: id })

  if (invoice) {
    return res.status(200).json({ msg: "invoice deleted", data: invoice })
  }
  throw new NotFoundError("invoice with particular id was not found")
}

module.exports = { createInvoice, getAllInvoices, getInvoice, deleteInvoice, updateInvoice }