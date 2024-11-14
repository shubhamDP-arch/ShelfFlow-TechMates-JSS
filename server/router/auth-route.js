
const { registerAdmin, loginAuth} = require("../controllers/adminAuth.controllers");


router.route("/register").post(registerAdmin)
router.route("/login").post(loginAuth)

module.exports = router