const jwt = require('jsonwebtoken');
const joi = require('joi');

exports.tokenGen = (payload) => {
    return new Promise((resolve,reject) => {
        jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:process.env.EXPIRES},(err,token) => {
            if(err) {
                reject(new Error(`Token Creation error, ${err}`));
            }
            resolve(token);
        })
    })
}

exports.tokenVerify = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const schema = joi.string().min(40).max(200).required();
        const {error} = schema.validate(token);
        if(error) {
            res.status(400).json({
                message:'InCorrect Token',
                value:error
            })
            return;
        }

        jwt.verify(token,process.env.SECRET_KEY,(err,decoded) => {

            if(err) {
                res.status(403).json({
                    message:'Expired API Token'
                })
                return;
            }

            req.userData = decoded;
            next()
        })
    } catch (error) {
        res.status(500).send('Token Validation Error');
    }
}