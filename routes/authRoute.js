const {Router} = require('express')
const authController = require('../controllers/authController')

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);


module.exports = router;