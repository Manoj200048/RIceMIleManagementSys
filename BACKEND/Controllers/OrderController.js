// Controllers/OrderController.js
const Order = require("../Model/OrderModel");

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find(); // Retrieve all orders
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json({ message: "An error occurred while retrieving orders.", error: err });
    }
};

const addOrder = async (req, res) => {
    const { orderId, customerId, products, totalPrice, status, productName } = req.body; // Include productName

    try {
        const newOrder = new Order({
            orderId,
            customerId,
            products,
            totalPrice,
            status,
            productName, 
        });

        await newOrder.save();
        return res.status(201).json(newOrder); // Return the created order
    } catch (err) {
        return res.status(500).json({ message: "An error occurred while creating the order.", error: err });
    }
};

const getOrderById = async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }
        return res.status(200).json(order); // Return the found order
    } catch (err) {
        return res.status(500).json({ message: "An error occurred while retrieving the order.", error: err });
    }
};

const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    const { products, totalPrice, status, productName } = req.body; // Include productName in updates

    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            {
                products,
                totalPrice,
                status,
                productName, // Update with the new field
            },
            { new: true } // To return the updated document
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        return res.status(200).json(order); // Return the updated order
    } catch (err) {
        return res.status(500).json({ message: "An error occurred while updating the order.", error: err });
    }
};

const deleteOrder = async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        return res.status(200).json({ message: "Order deleted successfully." }); // Return success message
    } catch (err) {
        return res.status(500).json({ message: "An error occurred while deleting the order.", error: err });
    }
};

module.exports = {
    getAllOrders,
    addOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
};
