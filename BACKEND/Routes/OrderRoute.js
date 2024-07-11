// Routes/OrderRoute.js
const express = require("express");
const OrderController = require("../Controllers/OrderController");

const router = express.Router();

router.get("/", OrderController.getAllOrders);
router.post("/", OrderController.addOrder);
router.get("/:id", OrderController.getOrderById);
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
