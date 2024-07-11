const express = require("express");
const route = express.Router();


//insert controller
const locationController = require("../Controllers/LocationController");

route.get("/", locationController.getAllLocation);
route.get("/names", locationController.getAllLocationNames);
route.post("/", locationController.addLocation);
route.get("/:id", locationController.getById);
route.put("/:id", locationController.updateLocation);
route.delete("/:id", locationController.deleteLocation);


//export
module.exports = route;