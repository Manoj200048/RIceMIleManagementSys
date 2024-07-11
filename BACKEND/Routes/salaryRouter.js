// In salaryRouter.js
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/salaryControllers");

// Define routes
router.get("/", userController.getALLusers);
router.post("/", userController.addUsers);
router.get("/:id", userController.getById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser); // Ensure correct route for delete

module.exports = router;
