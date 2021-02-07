const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    salt:String,
    role: {
        type:String,
        default:"user"
    },
},
{
    timestamps:true
},
{ versionKey: false })

module.exports = mongoose.model('users',authSchema);