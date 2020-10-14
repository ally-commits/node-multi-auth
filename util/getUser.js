const jwt = require('jsonwebtoken');
const { secret_key } = require('../config/keys');

module.exports.getUser = async (token,next) => {
    await jwt.verify(token, secret_key, async (err,user) => {
        if(err) {
            next(err)
        } 
        next(user)
    });
};