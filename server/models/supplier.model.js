const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
  },
  supplierEmail: {
    type: String,
    required: true,
    unique: true,
  },
  products:[
    {
      type: String,
      required: true
    }
  ]
});

module.exports = mongoose.model("Supplier", supplierSchema)
