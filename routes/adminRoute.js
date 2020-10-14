const {Router} = require('express')
const adminController = require('../controllers/adminController')

const router = Router();

router.get("/get-loans", adminController.getLoans);  
router.get("/get-users", adminController.getUsers);  
router.post("/add-agent", adminController.addAgent);  
router.put("/update-loan-status", adminController.updateLoanStatus);  

module.exports = router;