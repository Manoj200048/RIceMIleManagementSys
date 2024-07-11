const express = require("express");
const route = express.Router();

//insert model
const variety = require("../Model/VarietyModel");
//insert controller
const varietyController = require("../Controllers/VarietyControllers");

route.get("/", varietyController.getAllVarieties);
route.post("/", varietyController.addVarieties);
route.get("/:id", varietyController.getById);
route.put("/:id", varietyController.updateVariety);
route.delete("/:id", varietyController.deleteVariety);

//export
module.exports = route;