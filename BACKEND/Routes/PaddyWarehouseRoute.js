const express = require("express");
const router = express.Router();

const relationshipController = require("../Controllers/PaddyWarehouseController");

// POST request to create a relationship between paddy and location
router.post("/", relationshipController.createRelationship);

module.exports = router;
