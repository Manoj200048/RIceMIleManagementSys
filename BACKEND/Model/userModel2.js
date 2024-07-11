const mongoose = require("mongoose");
const Schmema = mongoose.Schema;

const userSchema = new Schmema({
    resourse_id:{
        type:String,//data type
        required: true,//validate

    },
    Amount_of_paddy:{
        type:Number,//data type
        required: true,//validate

    },
   
});

module.exports = mongoose.model(
    "userModel2",//file name
    userSchema //function name

)