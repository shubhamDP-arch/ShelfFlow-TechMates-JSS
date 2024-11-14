const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  exp_date: {
    type: String,
    required: true,
  },
  current_date: {
    type: Date, 
    required: true,
    default: Date.now, 
  },
  shopId:{
    type:String,
    required: true
  }
});


orderSchema.pre("save", function (next) {
  this.current_date = new Date()
  next()
});

const Orders = mongoose.model("orders", orderSchema);
module.exports = Orders;