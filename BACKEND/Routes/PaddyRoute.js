const express = require("express");
const route = express.Router();

//insert model
const paddy = require("../Model/PaddyModel");
//insert controller
const paddyController = require("../Controllers/PaddyController");

route.get("/", paddyController.getAllPaddy);
route.get("/totalPrice", paddyController.getTotalPrice);
route.get("/totalWeight", paddyController.getTotalWeight);
route.post("/", paddyController.addPaddy);
route.get("/:id", paddyController.getById);
route.put("/:id", paddyController.updatePaddy);
route.delete("/:id", paddyController.deletePaddy);

//export
module.exports = route;