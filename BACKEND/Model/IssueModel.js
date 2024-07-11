// Model/IssueModel.js
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const issueSchema = new Schema(
  {
    issueId: { type: Number }, // Auto-increment field
    issueDate: { type: Date, default: Date.now }, // Auto-assign current date/time
    issueDescription: { type: String, required: true }, // Issue description
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Apply auto-increment to the issueId field
issueSchema.plugin(AutoIncrement, { inc_field: 'issueId' });

module.exports = mongoose.model('Issue', issueSchema);
