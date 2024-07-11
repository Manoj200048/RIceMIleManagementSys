const express = require("express");
const router = express.Router();

const User = require("../Model/userModel3");
const UserController = require("../Controllers/userController");

router.get("/",UserController.getAllusers);
router.post("/",UserController.addUser);
router.get("/:id",UserController.getById);
router.put("/:id",UserController.updateUser);
router.delete("/:id",UserController.deleteUser);




module.exports = router;