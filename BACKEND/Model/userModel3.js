const mongoose = require("mongoose");
const Schmema = mongoose.Schema;

const userSchema = new Schmema({
    production_ID:{
        type:String,//data type
        required: true,//validate

    },
    date:{
        type:String,//data type
        required: true,//validate

    },
    quantity:{
        type:Number,//data type
        required: true,//validate

    },
    variety:{
        type:String,//data type
        required: true,//validate

    },
});

module.exports = mongoose.model(
    "userModel3",//file name
    userSchema //function name

)