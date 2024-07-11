const express = require("express");
const router = express.Router();

//Insert Model
const productControl = require("../Controllers/productControl");

//Insert User Controller
router.get("/", productControl.getAllProduct);
router.post("/", productControl.addProducts);
router.get("/:id", productControl.getProductById);
router.delete("/:id", productControl.deleteProduct);
router.put("/:id",productControl.updateProduct);


//export
module.exports = router;