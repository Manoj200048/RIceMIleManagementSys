const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    basicsalary:{
        type:String,//datatype
        required:true,//validate
    },
    
    othours:{
        type:String,//datatype
        required:true,//validate
    },
    AmountOTH:{
        type:Number,//datatype
        required:true,//validate
    },
    bonus:{
        type:String,//datatype
    },
    totalsalary:{
        type:String,//datatype
        required:true,//validate
    },
});

module.exports = mongoose.model("salaryModel",userSchema);