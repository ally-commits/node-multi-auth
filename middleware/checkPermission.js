const {getUser} = require("../util/getUser");

module.exports.checkPermission = (permission) => {
    return async (req, res, next) => {
        const token = req.headers.authorization;
        await getUser(token,(user) => { 
            if (user && user.user.role == permission) {
                next(); 
            } else {
                res.status(403).json({message: "Forbidden: you don't have enough access to this content"});  
            }
        })
    }
}