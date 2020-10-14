const { tokenMaxAge, secret_key } = require("../config/keys");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const bcrypt = require('bcrypt');


const createToken = (user) => {
    return jwt.sign({ user }, secret_key, {
      expiresIn: tokenMaxAge
    });
};

module.exports.register = async (req, res) => {
    const { email, password ,name} = req.body;
    try {
        const user = await User.create({ email, password,name,role: "CUSTOMER" });

        const token = createToken(user);
        
        res.status(201).json({ user: user ,token: token});
    }
    catch(err) { 
        let error = err.message
        if(err.code == 11000) {
            error = "Email already exists"
        }
        res.status(400).json({ error: error });
    }   
}
  

module.exports.login = async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if(auth) {
                const token = createToken(user); 
                res.status(200).json({ user, token });
            }
            throw Error('incorrect password');
        }
        throw Error('incorrect email');
    }
    catch(err) { 
        let error = err.message 
        res.status(400).json({ error: error });
    }
}