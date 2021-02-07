const { object } = require("joi");
const Joi = require("joi");
const { dbInstance } = require("../db_driver/dbDriver");
const mailer = require("../Handler/Mailer/mailer");


exports.listUsers = (req,res) => {
    var db = dbInstance();
    db.collection('users').find().toArray((err,result) => {
        if(err) {
            res.status(400).send('Unable to list the Users');
            return;
        }
        const {_id,userName,email,role,JoinedDate,isActive} = result[0];
        const userList = {
            _id,
            userName,
            email,
            role,
            JoinedDate,
            isActive
        }
        res.status(200).json(userList);
    })
}

exports.updateUserStatus = (req,res) => {
    const value = req.body;
    const schema = Joi.object().keys({
        email:Joi.string().email().required(),
        isActive:Joi.string().required()
    })
    const {error} = schema.validate(value);
    if(error) {
        res.status(401).json({
            message:'Invalid Params Request'
        })
        return;
    }
    const {email,isActive} = value;
    if(isActive === 'deactivate') {
        var db = dbInstance();
       db.collection('users').updateOne({email},{$set:{isActive:false}},(err,result) => {
           if(err) {
               res.status(400).send('User deactivation failed');
               return;
           }
           const mailParams = {
            from:process.env.EMAIL_USER,
            to:email,
            subject:'Account Deactivated',
            html:` 
                    <h1>Your sdkApp Account has been deactivated, Kindly contact your Admin !</h1>
                    <p>This is an automation email</p>   
                    <hr />
                `
           }
           mailer(mailParams).then((resp) => {
            res.status(200).send('User has been Deactivated');
           }).catch((err) => {
               res.status(400).send('Acknowledgement Mail Not Sent to User');
           })
           
       }) 
    }
     else if(isActive === 'activate') {
        var db = dbInstance();
        db.collection('users').updateOne({email},{$set:{isActive:true}},(err,result) => {
            if(err) {
                res.status(400).send('User deactivation failed');
                return;
            }
            const mailParams = {
                from:process.env.EMAIL_USER,
                to:email,
                subject:'Account Activated',
                html:` 
                        <h1>Your sdkApp Account has been activated!</h1>
                        <p>This is an automation email</p>   
                        <hr />
                    `
               }
               mailer(mailParams).then((resp) => {
                res.status(200).send('User has been activated');
               }).catch((err) => {
                   res.status(400).send('Acknowledgement Mail Not Sent to User');
               })
        })  
     }
}

exports.updateRole = (req,res) => {
    const schema = Joi.object().keys({
        email:Joi.string().email().required(),
        role:Joi.string().required()
    })
    const {error} = schema.validate(req.body);
    if(error) {
        res.status(401).json({
            message:'Invalid Params Request'
        })
        return;
    }
    const {email,role} = req.body;
        var db = dbInstance();
       db.collection('users').updateOne({email},{$set:{role:role}},(err,result) => {
           if(err) {
               res.status(400).send('User role change failed');
               return;
           }
        
        res.status(200).send(`${email} has been updated to ${role}`);
           
       }) 
}
