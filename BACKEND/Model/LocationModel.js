const mongoose = require("mongoose");
const schema = mongoose.Schema;

const locationSchema = new schema({
  _id: { 
    type: String,
     required: true,
    }, // Modify _id definition
  locationName: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("LocationModel", locationSchema);
