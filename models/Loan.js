const mongoose = require('mongoose');  

const loanSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: ["NEW","REJECTED","APPROVED"], 
  }, 
  interestRate: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    require: true
  },
  agent_id: { 
    type : mongoose.Schema.Types.ObjectId, 
    ref: 'user'
  },
  user_id: { 
    type : mongoose.Schema.Types.ObjectId, 
    ref: 'user'
  },
},{timestamps: true});
 

const Loan = mongoose.model('loan', loanSchema);

module.exports = Loan;