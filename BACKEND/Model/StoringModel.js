const mongoose= require("mongoose");
const schema = mongoose.Schema;

const StoringInstSchema = new schema({
    topic:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model(
    "StoringModel" , //file name
    StoringInstSchema //function schema
)