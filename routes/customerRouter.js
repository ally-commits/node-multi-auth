const {Router} = require('express')
const customerController = require('../controllers/customerController')

const router = Router();

router.get("/get-loans", customerController.getLoans); 


module.exports = router;