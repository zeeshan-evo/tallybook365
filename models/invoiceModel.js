const mongoose = require("mongoose")

const invoiceSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, "user id is missing"],
  },
  client_id: {
    type: String,
    required: [true, "client id is missing"],
  },
  client_name: {
    type: String,
    required: [true, "client name is missing"],
  },
  client_address: {
    type: String,
  },
  title: {
    type: String,
    required: [true, "quote title is missing"],
  },
  job_no: {
    type: Number,
    required: [true, "job_no is missing"],
  },
  date: {
    type: Date,
    required: [true, "date is missing"],
    default: Date.now(),
  },
  items: {
    type: Array,
    default: [],
  },
  t_and_c: {
    type: String,
  },
  bank_account: {
    type: String,
  },
  bank_name_address: {
    type: String,
  },
  swift: {
    type: String,
  },
  routing_no: {
    String,
  },
})

module.exports = mongoose.model("Invoice", invoiceSchema)
