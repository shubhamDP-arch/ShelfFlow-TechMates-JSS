const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  notificationType: {
    type: String,
    required: true,
  },
  description:{
    type:String,
    required : true
}

});
const Notification = new mongoose.model("notifications", notificationSchema)
module.exports = {Notification}