const mongoose= require("mongoose");
const schema = mongoose.Schema;

const ProductSchema = new schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model(
    "productModel" , //file name
     ProductSchema //function schema
)
