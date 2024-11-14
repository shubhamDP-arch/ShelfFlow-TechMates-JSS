
const { registerAdmin, loginAuth} = require("../controllers/adminAuth.controllers");
const authControllers = require("../controllers/auth-controller");
const { getAllSupplier } = require("../controllers/supplier.controller");

router.route("/register").post(registerAdmin)
router.route("/login").post(loginAuth)
router.route("/insertproduct").post(authControllers.insertProduct);
router.route("/updateprodct").post(authControllers.updateProduct);
router.route("/deleteproduct").post(authControllers.deleteItem);
router.route("/allSupplier").post(getAllSupplier)

module.exports = router