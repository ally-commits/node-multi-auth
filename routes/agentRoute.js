const {Router} = require('express')
const agentController = require('../controllers/agentController')

const router = Router();

router.post("/create-loan", agentController.createLoan); 
router.get("/get-users",agentController.getUsers)
router.get("/get-loans",agentController.getLoans)

module.exports = router;