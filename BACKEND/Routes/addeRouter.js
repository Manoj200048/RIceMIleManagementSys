// userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../Controllers/addeControllers");

router.get("/", userController.getALLusers);
router.post("/", userController.addUsers);
router.get("/:id", userController.getById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
