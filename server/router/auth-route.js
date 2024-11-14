const express = require("express")
const router = express.Router();
const { registerAdmin, loginAuth} = require("../controllers/adminAuth.controller");
const authControllers = require("../controllers/auth-controller");

router.route("/register").post(registerAdmin)
router.route("/login").post(loginAuth)
router.route("/insertproduct").post(authControllers.insertProduct);
router.route("/updateprodct").post(authControllers.updateProduct);
router.route("/deleteproduct").post(authControllers.deleteItem)

module.exports = router