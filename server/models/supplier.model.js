const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
  },
  supplierEmail: {
    type: String,
    required: true,
  },

  products:[
    {
      type: String,
    }
  ]
});

module.exports = mongoose.model("Supplier", supplierSchema)
