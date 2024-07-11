const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paddySchema = new Schema({
  weight: {
    type: Number,
    required: true,
  },

  mContent: {
    type: Number,
    required: true,
  },

  pDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PaddyModel", paddySchema);
