const mongoose = require('mongoose');
const UserSchema =  new mongoose.Schema({
        userName:{
            Type:String
        },
        userId:{
            Type:Number
        },
        dob:{
            Type:String
        },
        userAddress:{
            Type:String
        },
        photo:{
            Type:String
        },
        Date: {
            Type:Date
        }
    })
    module.exports = User = mongoose.model('users', UserSchema);