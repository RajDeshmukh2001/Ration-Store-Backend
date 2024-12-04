const Order = require("../../models/Order");

const getUserOrders = async (req, res) => {
    try {
        const id  = await req.params.id;

        if (id) {
            const orders = await Order.find({ 'customer.userId': id });
            res.status(200).json(orders);
        }
    } catch (error) {
        res.status(400).json({ message: `Internal Server error. ${error}` });
    }
}

module.exports = { getUserOrders };