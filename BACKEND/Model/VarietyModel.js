const mongoose = require("mongoose");
const schema = mongoose.Schema;

const varietySchema = new mongoose.Schema({
  varietyName: { type: String, required: true },
  count: { type: Number, default: 0 }, // Add the new field
});

module.exports = mongoose.model(
  "VarietyModel", //file name
  varietySchema //function schema
);
