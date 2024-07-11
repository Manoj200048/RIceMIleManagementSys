// Routes/FeedbackRoute.js
const express = require("express");
const FeedbackController = require("../Controllers/FeedbackController");

const router = express.Router();

router.get("/", FeedbackController.getAllFeedbacks);
router.post("/", FeedbackController.addFeedback);
router.get("/:id", FeedbackController.getFeedbackById);
router.put("/:id", FeedbackController.updateFeedback);
router.delete("/:id", FeedbackController.deleteFeedback);

module.exports = router;
