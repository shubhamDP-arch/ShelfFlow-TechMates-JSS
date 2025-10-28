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
    type: String, 

  },
  shopId:{
    type:String,

  }
});


orderSchema.pre("save", function (next) {
  const date = new Date();
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  console.log(formattedDate)
  this.current_date = formattedDate
  next()
});


const Orders = mongoose.model("orders", orderSchema);
module.exports = Orders;