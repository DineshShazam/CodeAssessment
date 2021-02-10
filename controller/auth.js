const Joi = require('joi');
const {hash,verify} = require('../Handler/encrypt/encrypt');
const { dbInstance } = require('../db_driver/dbDriver');
const moment = require('moment');
const { tokenGen } = require('../Handler/JWT_Auth/jwt');
const mailer = require('../Handler/Mailer/mailer');
const jwt = require('jsonwebtoken');

exports.register = async (req,res) => {
    const value = req.body;
    const schema = Joi.object().keys({
        userName:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required(),
        role:Joi.string().required()
    })
    const {error} = schema.validate(value);
    if(error) {
        res.status(401).json({
            message:'Invalid Params Request'
        })
        return;
    }
    const {userName,email,password,role} = req.body;
    const collection = process.env.AUTH_COLLECTIONS;
    const result = await dbInstance().collection(collection).find({email}).toArray();
    if(result.length !== 0) {
        res.status(400).send('Email has been Already Regsitered');
        return;
    }
    const {encryptedData,saltkey} = await hash(password);

    const params = {
        userName, 
        email,
        encryptedData,
        saltkey,
        role
    }
    const token = await tokenGen(params,"5m");

    if(token) {
        const mailParams = {
            from:process.env.EMAIL_USER,
            to:email,
            subject:'Account Activation Link',
            path:'view_template/layout/mailConfirm.hbs',
        }
        const mailData = {
            url:`${process.env.CLIENT_URL}/user/activate/${token}`
        }
        mailer(mailParams,mailData);
        res.status(200).json({
            message:'Activation Mail Sent',
            value:'success' 
        })
        
    }
}

exports.activationRequest = async (req,res) => {
    const tokenValidation = req.body;
   if(!tokenValidation) {
       res.status(401).send('Token is Missing');
        return;
   }
        const token = tokenValidation;
        const schema = Joi.object().keys({
            activationToken: Joi.string().min(40).required()
        }) 
        const {error} = schema.validate(token);
        if(error) {
            //const {TokenExpiredError} = error
            res.status(400).send('Invalid Token');
            return;
        }
        jwt.verify(token.activationToken,process.env.SECRET_KEY,async (err,decoded) => {
         
            if(err) {
                res.status(401).send('URL has been Expired');
                return;
            }
            decoded = {...decoded,Joineddate:moment().format('llll'),isActive:true};
            delete decoded['iat']
            const {email} = decoded
            const userExist = await dbInstance().collection('users').find({email}).toArray();
            if(userExist.length !== 0) {
                res.status(401).send('User Already Been Registered');
                return;
            }
            dbInstance().collection('users').insertOne(decoded,async (err,result) => {
                if(err) {
                    res.status(400).send('User Not Registered');
                    return;
                }
                const {ops} = result;
                const [{userName,role}] = ops;
                const userToken = await tokenGen({
                    userName,
                    role
                },"6h");
                res.status(200).json({
                    message:`Welcome ${userName}`,
                    value:{
                        role,
                        userToken
                    }
                })
            })
        })
  
}

exports.login = async (req,res) => {
    const value = req.body;
    const schema = Joi.object().keys({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })
    const {error} = schema.validate(value);
    if(error) {
        res.status(401).send('Invalid Param Request')
        return;
    }

    const {email,password} = req.body;
    const userExist = await dbInstance().collection('users').find({email}).toArray();
    if(userExist.length === 0) {
        res.status(401).send('Invalid Email');
        return;
    }
    const {isActive} = userExist[0];
    if(isActive === false) {
        res.status(401).send('Your Account Has been Deactivated');
        return;
    }
    const {userName,role,encryptedData,saltkey} = userExist[0];
    const authBool = await verify(password,saltkey,encryptedData);
    if(authBool) {
        const apiToken = await tokenGen({userName,role},"6hr");
        res.status(200).json({
            message:`Welcome ${userName}`,
            value:{
                userName,
                role,
                apiToken
            }
        })
    } else {
        res.status(401).send('Invalid Password');
    }

}