const mongoose = require("mongoose");
const schema = mongoose.Schema;

const instructionSchema = new schema({
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("InstructionModel", instructionSchema);
