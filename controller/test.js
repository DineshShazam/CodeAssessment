const { dbInstance } = require('../db_driver/dbDriver');
const testSchema = require('../schema/testSchema');


exports.testAPI = async (req,res) => {
    const values = req.body;
    const db = getDb();
  
        db.collection('test').find().toArray((err,items) => {
            console.log(items);
        })
}


const Joi = require('joi');
const {hash,verify} = require('../Handler/encrypt/encrypt');
const authSchema = require('../schema/authSchema');

exports.register = async (req,res) => {
    const value = req.body;
    const schema = Joi.object().keys({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required()
    })
    const {error} = schema.validate(value);
    if(error) {
        res.status(401).json({
            message:'Invalid Params Request'
        })
        return;
    }
    const {name,email,password} = req.body;

    authSchema.findOne({email}).exec((err,user) => {
        if(user) {
            res.status(200).json({
                message:'User already Registered'
            });
            return;
        }
    });
    const {encryptedData,saltkey} = await hash(password);
    const params = {
        name,
        email,
        password:encryptedData,
        salt:saltkey,
    }
    console.log(params)
    const result = await authSchema.insertMany(params);
    console.log(result);

}