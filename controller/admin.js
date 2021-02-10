const Joi = require("joi");
const { dbInstance } = require("../db_driver/dbDriver");
const mailer = require("../Handler/Mailer/mailer");


exports.listUsers = (req,res) => {
    //var db = dbInstance();
    dbInstance().collection('users').find({}).toArray((err,result) => {
        if(err) {
            res.status(400).send('Unable to list the Users');
            return;
        }
      const value =  result.map((value) => {
       const {_id:id,userName,email,role,Joineddate,isActive} = value;
        return {
            id,
            userName,
            email,
            role,
            Joineddate,
            isActive
        }
        })
        
        res.status(200).json(value);
    })
}

exports.updateUserStatus = (req,res) => {
    const value = req.body;
    const schema = Joi.object().keys({
        email:Joi.string().email().required(),
        isActive:Joi.string().required(),
        userName: Joi.string().required()
    })
    const {error} = schema.validate(value);
    if(error) {
        res.status(401).json({
            message:'Invalid Params Request'
        })
        return;
    }
    const {userName,email,isActive} = value;
    let query;
    if(isActive === 'deactivate') {
        query = false
    }else if(isActive === 'activate') {
       query = true 
     }
     dbInstance().collection('users').updateOne({email},{$set:{isActive:query}} ,(err,result) => {
        if(err) {
            res.status(400).send(`User ${isActive} failed`);
            return;
        }
        const mailParams = {
         from:process.env.EMAIL_USER,
         to:email,
         subject:`Account ${isActive}`,
         path:'/view_template/layout/userStatus.hbs'
        }
        const mailData = {
            status:`${isActive}`
        }
        mailer(mailParams,mailData).then((resp) => {
         res.status(200).send(`${userName} has been ${isActive}`);
        }).catch((err) => {
            res.status(400).send('Acknowledgement Mail Not Sent to User');
        })
        
    })
}

exports.updateRole = (req,res) => {
    const schema = Joi.object().keys({
        email:Joi.string().email().required(),
        role:Joi.string().required(),
        userName: Joi.string().required()
    })
    const {error} = schema.validate(req.body);
    if(error) {
        res.status(401).json({
            message:'Invalid Params Request'
        })
        return;
    }
    const {userName,email,role} = req.body;
        dbInstance().collection('users').updateOne({email},{$set:{role:role}},(err,result) => {
           if(err) {
               res.status(400).send('User role change failed');
               return;
           }
        
        res.status(200).send(`${userName} has been updated to ${role}`);
           
       }) 
}
