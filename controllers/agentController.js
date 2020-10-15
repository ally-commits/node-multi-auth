const Loan = require('../models/Loan');
const { secret_key } = require('../config/keys');
const User = require('../models/User');
const { getUser } = require('../util/getUser');



module.exports.createLoan = async (req, res) => {
    const {interestRate, duration,amount,user_id } = req.body;
    const token = req.headers.authorization;
    try { 
        await getUser(token.replace("Bearer","").trim(),async (decodedData) => {
            const loan = await Loan.create({ interestRate,duration,amount ,agent_id: decodedData.user._id,status: "NEW" ,user_id});
              
            await User.updateOne({
                _id: user_id
            },{
                $push: {
                    loans: loan._id
                }
            }).exec(); 

            res.status(201).json({message: "Loan Created Successfully",loan})
        }); 
    }
    catch(err) { 
        let error = err.message 
        res.status(400).json({ error: error });
    }   
}


module.exports.getUsers = async (req, res) => { 
    try { 
        await User.find({role: "CUSTOMER"},(err,users) => {
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
        await Loan.find().populate("user_id").exec((err,data) => {
            res.status(200).json({loans: data})
        }) 
    }
    catch(err) { 
        let error = err.message 
        res.status(400).json({ error: error });
    }   
}


module.exports.updateLoan = async (req, res) => {
    const { loan_id,interestRate, duration,amount } = req.body;
    try {
        const user = await Loan.updateOne({_id: loan_id}, {interestRate, duration,amount});        
        res.status(201).json({ message: "Done successfully"});
    }
    catch(err) { 
        let error = err.message 
        res.status(400).json({ error: error });
    }   
}
  
 