// Controllers/IssueController.js
const Issue = require('../Model/IssueModel');

const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find(); // Fetch all issues
    res.status(200).json({ issues });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching issues.', error });
  }
};

const addIssue = async (req, res) => {
  const { issueDescription } = req.body;

  try {
    const newIssue = new Issue({ issueDescription }); // Auto-assigns issueId and issueDate
    await newIssue.save(); // Save to MongoDB
    res.status(201).json({ issue: newIssue });
  } catch (error) {
    res.status(500).json({ message: 'Error adding issue.', error });
  }
};

const deleteIssueById = async (req, res) => {
  const { id } = req.params; // Extract ID from the URL

  try {
    // Find and delete issue by issueId
    const issue = await Issue.findOneAndDelete({ issueId: id });

    if (!issue) {
      return res.status(404).json({ message: `Issue with ID ${id} not found.` });
    }

    res.status(200).json({ message: `Issue with ID ${id} deleted successfully.` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting issue.', error });
  }
};

module.exports = {
  getAllIssues,
  addIssue,
  deleteIssueById, // Include the new DELETE controller
};