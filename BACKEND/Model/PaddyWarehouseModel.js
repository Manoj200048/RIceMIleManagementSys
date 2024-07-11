// 1. Adjust Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const relationshipSchema = new Schema({
    firstDBId: {
        type: Schema.Types.ObjectId,
        ref: 'PaddyModel', // Assuming the name of your first model
        required: true
    },
    secondDBId: {
        type: Schema.Types.ObjectId,
        ref: 'LocationModel', // Assuming the name of your second model
        required: true
    }
});

module.exports = mongoose.model(
    "PaddyWarehouseModel",
    relationshipSchema
)
relationshipSchema.index({ firstDBId: 1, secondDBId: 1 }, { unique: true }); // Create a composite unique index