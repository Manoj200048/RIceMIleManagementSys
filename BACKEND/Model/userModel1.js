const mongoose = require("mongoose");
const Schmema = mongoose.Schema;

const userSchema = new Schmema({

   
    product_ID:{
        type:String,//data type
        required: true,//validate

    },
    bach_NO:{
        type:String,//data type
        required: true,//validate

    },
    poroduct_NAME:{
        type:String,//data type
        required: true,//validate

    },
    manufacture_DATE:{
        type:String,//data type
        required: true,//validate

    },

    expire_DATE:{
        type:String,//data type
        required: true,//validate

    },

    weight:{
        type:String,//data type
        required: true,//validate

    },

    discription:{
        type:String,//data type
        required: true,//validate

    },
});

module.exports = mongoose.model(
    "userModel1",//file name
    userSchema //function name

)