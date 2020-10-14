const User = require("../models/User"); 
const { getUser } = require("../util/getUser");

module.exports.getLoans = async (req, res) => {
    const token = req.headers.authorization;
    try {
        await getUser(token,async (decodedData) => {
            await User.findOne({_id: decodedData.user._id}).populate("loans").exec((err,data) => {
                
                res.status(200).json({details: data})
            }) 
        });
    }
    catch(err) { 
        let error = err.message;
        res.status(400).json({ error: error });
    }   
}
   