const Loan = require('../models/Loan');
const { secret_key } = require('../config/keys');
const User = require('../models/User');
const { getUser } = require('../util/getUser');


module.exports.getUsers = async (req, res) => { 
    try { 
        await User.find({},(err,users) => {
            res.status(200).json({users})
        });
    }
    catch(err) { 
        let error = err.message 
        res.status(400).json({ error: error });
    }   
}
  

module.exports.getLoans = async (req, res) => { 
    try { 
        await Loan.find().populate(["user_id","agent_id"]).exec((err,data) => {
            res.status(200).json({loans: data})
        }) 
    }
    catch(err) { 
        let error = err.message 
        res.status(400).json({ error: error });
    }   
}
  

module.exports.addAgent = async (req, res) => {
    const { email, password ,name} = req.body;
    try {
        const user = await User.create({ email, password,name,role: "AGENT" });
        
        res.status(201).json({ user: user,message: "Added Succesfully"});
    }
    catch(err) { 
        let error = err.message
        if(err.code == 11000) {
            error = "Email already exists"
        }
        res.status(400).json({ error: error });
    }   
}


module.exports.updateLoanStatus = async (req, res) => {
    const { loan_id, status} = req.body;
    try {
        const user = await Loan.updateOne({_id: loan_id}, {status: status});        
        res.status(201).json({ message: "Done successfully"});
    }
    catch(err) { 
        let error = err.message 
        res.status(400).json({ error: error });
    }   
}
  


  