const Order = require("../../models/Order");

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = await req.query;

        const order = await Order.findById({ _id: id });

        if (order.status === 'accepted') {
            return res.status(400).json({ message: "The order is already accepted." });
        }

        if (order) {
            await Order.findByIdAndUpdate(id, { $set: { status: 'accepted' } });
        }
        return res.status(200).json({ message: "Order accepted" });
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error}` });
    }
}

module.exports = { updateOrderStatus }