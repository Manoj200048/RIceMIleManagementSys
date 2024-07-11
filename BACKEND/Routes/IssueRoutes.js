// Routes/IssueRoutes.js
const express = require('express');
const router = express.Router();
const IssueController = require('../Controllers/IssueController');

router.get('/', IssueController.getAllIssues); // Get all issues
router.post('/', IssueController.addIssue); // Add new issue
router.delete('/:id', IssueController.deleteIssueById); // Delete issue by ID - New Route

module.exports = router;
