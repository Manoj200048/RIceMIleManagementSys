const express=require("express");
const route = express.Router();

//insert model
const rice = require("../Model/RiceModel");
//insert controller
const riceController = require("../Controllers/RiceController");

route.get("/", riceController.getAllRice);
route.post("/", riceController.addRice);
route.get("/:id", riceController.getById);
route.put("/:id", riceController.updateRice);
route.delete("/:id", riceController.deleteRice);

//export
module.exports = route;