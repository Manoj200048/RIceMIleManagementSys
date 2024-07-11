const express = require("express");
const route = express.Router();

//insert model
const storing = require("../Model/StoringModel");
//insert controller
const storingControllerr = require("../Controllers/StoringController");

route.get("/", storingControllerr.getAllStoring);
route.post("/", storingControllerr.addStoring);
//route.get("/:id", storingControllerr.getById);
route.put("/:id", storingControllerr.updateStoring);
route.delete("/:id", storingControllerr.deleteStoring);

//export
module.exports = route;