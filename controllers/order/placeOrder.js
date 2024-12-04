const Order = require("../../models/Order");

const placeOrder = async (req, res) => {
    try {
        const orderData = await req.body;
        const order = await Order.create(orderData);
        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: `Failed to place order ${error}` });
    }
}

module.exports = { placeOrder };