const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RiceSchema = new Schema({
    variety:{
        type: String,
        required: true,
    },

    description:{
        type: String,
        required: true,
    },

    MFD:{
        type: Date,
        required: true,
    },  

    EXD:{
        type: Date,
        required: true,
    }, 

    price:{
        type: Number,
        required: true,
    },  

    weight:{
        type: String,
        required: true,
    } 


})

module.exports = mongoose.model(
    "RiceModel",
    RiceSchema
)