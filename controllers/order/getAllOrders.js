const Order = require("../../models/Order");

const getAllOrders = async (req, res) => {
    try {
        const order = await Order.find({}).sort({ createdAt: -1 });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Internal server error: ", error });
    }
}

module.exports = { getAllOrders };