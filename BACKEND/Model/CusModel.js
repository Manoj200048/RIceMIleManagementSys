const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({

    userName:{
        type:String, //datatype
        required:true, // vali
    },
    password:{
        type:String, //type
        required:true, // vali
    },
    firstName:{
        type:String, //type
        required:true, // vali
    },
    lastName:{
        type:String, //type
        required:true, // vali
    },
    bName:{
        type:String, //type
        required:true, // vali
    },

    bRegName:{
        type:String, //type
        required:true, // vali
    },

    bOwner:{
        type:String, //type
        required:true, // vali
    },
    address:{
        type:String, //type
        required:true, // vali
    }


});

module.exports = mongoose.model(
    "UserModel", //file name
    userSchema 
)