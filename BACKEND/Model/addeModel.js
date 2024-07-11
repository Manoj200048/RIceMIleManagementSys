const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    username:{
        type:String,//datatype
        required:true,//validate
    },
    name:{
        type:String,//datatype
        required:true,//validate
    },
    NIC:{
        type:Number,//datatype
        required:true,//validate
    },
    Gender:{
        type:String,//datatype
    },
    Email:{
        type:String,//datatype
        required:true,//validate
    },
    DOB:{
        type:Date,//datatype
    },
    password:{
        type:String,//datatype
    },
    contactno:{
        type:Number,//datatype
    },
});

module.exports = mongoose.model("addeModel",userSchema);