const Products = require("../models/product.model");
const { Notification } = require("../models/notification.model");
const Orders = require("../models/order.model");

const sendNotification = async (req, res) => {
  try {
    console.log("Notification check started");
    const shopid  = req.body.shopid;
    const currentDate = new Date();

    const currentProducts = await Products.find({ shopid });
    const orderProducts = await Orders.find({ shopId: shopid });
 
    const dateIn10Days = new Date();
    dateIn10Days.setDate(currentDate.getDate() + 10);

    console.log(currentProducts + "Kannada")
 
    const alreadyExpiredProducts = orderProducts.filter((item) => {
      const { exp_date } = item;
      if (exp_date) {
        const [year, month, day] = exp_date.split('-')
        const expDateObj = new Date(`${year}-${month}-${day}`)
        return expDateObj < currentDate;
      }
      return false;
    });

    console.log(orderProducts, "OPPPPPPPPPPPPPPPPp")
    const soonToExpireProducts = orderProducts.filter((item) => {
      const { exp_date } = item
      if (exp_date) {
        const [year, month, day] = exp_date.split('-')
        const expDateObj = new Date(`${year}-${month}-${day}`)
        console.log(expDateObj, currentDate, "Correct")
        return expDateObj >= currentDate && expDateObj <= dateIn10Days
      }
      return false;
    });

    console.log(soonToExpireProducts)


    const thresholdProducts = currentProducts.filter((item) => {
      const { productthreshold, quantity } = item;
      return productthreshold && quantity && quantity < productthreshold;
    });
    


    const expiredNotifications = alreadyExpiredProducts.map((product) => ({
      notificationType: "Product Expired",
      description: `Product ${product.name}has already expired on ${product.exp_date}.`,
      shopId: shopid
    }));

 
    const soonToExpireNotifications = soonToExpireProducts.map((product) => ({
      notificationType: "Upcoming Expiry",
      description: `Product ${product.name} you ordered on ${product.current_date} will expire on ${product.exp_date}.`,
      shopId: shopid
    }));

    const thresholdNotifications = thresholdProducts.map((product) => ({
      notificationType: "Low Stock",
      description: `Product ${product.productname} is below the threshold level. Current quantity: ${product.quantity}, Threshold: ${product.productthreshold}.`,
      shopId: shopid
    }));

    const notifications = [
      ...expiredNotifications,
      ...soonToExpireNotifications,
      ...thresholdNotifications,
    ];
    console.log("Generated notifications:", notifications)

    if (notifications.length > 0) {
      
      await Notification.insertMany(notifications)
      res.status(200).json({ data: notifications, notificationFound : true })
    } else {
      res.status(200).json({ message: "No expired or low-stock products found." , notificationFound : false })
    }
  } catch (error) {
    console.error("Error in sendNotification:", error);
    res.status(500).json({ message: "An error occurred while sending notifications." });
  }
  await Notification.deleteMany({});
};

module.exports = { sendNotification };