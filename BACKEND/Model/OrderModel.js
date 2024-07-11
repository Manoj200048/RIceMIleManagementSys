// Model/OrderModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId: {
        type: String,
        required: true,
        unique: true, // Ensure each order has a unique ID
    },
    customerId: {
        type: String,
        ref: "UserModel", // Assuming this references a user in UserModel
        required: true,
    },
    productName: {
        type: String, // New field outside the `products` array
        required: true, // Assuming it's optional
    },
    products: [
        {
            productId: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now, // Default to the current date and time
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending",
    },
});

const OrderModel = mongoose.model("OrderModel", orderSchema);

module.exports = OrderModel;
