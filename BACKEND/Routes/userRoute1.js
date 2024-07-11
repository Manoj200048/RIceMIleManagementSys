const express = require("express");
const router = express.Router();

const User = require("../Model/userModel1");
const UserController = require("../Controllers/userController1");

router.get("/",UserController.getAllusers);
router.post("/",UserController.addUser);
router.get("/:id",UserController.getById);
router.put("/:id",UserController.updateUser);
router.delete("/:id",UserController.deleteUser);




module.exports = router;