const express = require("express")
const { createInvoice, getAllInvoices, getInvoice, deleteInvoice, updateInvoice } = require("../controllers/invoiceController")
const authenticateUser = require("../utils/authorize-authenticate")
const invoiceRouter = express.Router()

invoiceRouter.post("/invoices", authenticateUser, createInvoice)
invoiceRouter.get("/invoices", authenticateUser, getAllInvoices)
invoiceRouter.get("/invoices/:id", authenticateUser, getInvoice)
invoiceRouter.delete("/invoices/:id", authenticateUser, deleteInvoice)
invoiceRouter.patch("/invoices/:id", authenticateUser, updateInvoice)

module.exports = invoiceRouter