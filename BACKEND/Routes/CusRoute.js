const express = require("express");
const router = express.Router();

const User = require("../Model/CusModel");

const UserController=require("../Controllers/CusControll");

router.get("/",UserController.gellAllUsers);
router.post("/",UserController.addUsers);
router.get("/:id",UserController.getById);
router.put("/:id",UserController.updateUser);
router.delete("/:id",UserController.deleteUser);

//expo
module.exports = router;
