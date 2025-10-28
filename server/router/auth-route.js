const express = require("express")
const router = express.Router();
const { registerAdmin, loginAuth, verifyOtp} = require("../controllers/adminAuth.controller");
const authControllers = require("../controllers/auth-controller");
const { getAllSupplier } = require("../controllers/supplier.controller");
const { sendNotification } = require("../controllers/notification.controller");

router.route("/register").post(registerAdmin)
router.route("/login").post(loginAuth)
router.route("/insertproduct").post(authControllers.insertProduct);
router.route("/updateproduct").post(authControllers.updateProduct);
router.route("/deleteproduct").post(authControllers.deleteItem)
router.route("/getcartitems").post(authControllers.getCartItems)
router.route("/scanproduct").post(authControllers.scanProduct)
router.route("/addtocart").post( authControllers.addToCart)
router.route("/updatestock").post( authControllers.updateStock)
router.route("/deleteitemincart").post(authControllers.deleteItem)
router.route("/deleteproduct").post(authControllers.deleteItem);
router.route("/allSupplier").post(getAllSupplier)
router.route("/notifications").post(sendNotification)
router.route("/getproducts").post(authControllers.getProducts)
router.route("/product/:productId").get(authControllers.productDetails)
router.route("/verifyotp/:email").post(verifyOtp)
router.route("/soldproducts").post(authControllers.soldProducts)
router.route("/addorder").post(authControllers.addOrder)

module.exports = router