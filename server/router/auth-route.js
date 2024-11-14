
const { registerAdmin, loginAuth} = require("../controllers/adminAuth.controllers");
const authControllers = require("../controllers/auth-controller");

router.route("/register").post(registerAdmin)
router.route("/login").post(loginAuth)
router.route("/insertproduct").post(authControllers.insertProduct);

module.exports = router