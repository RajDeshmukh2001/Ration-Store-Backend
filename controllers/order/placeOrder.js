const Order = require("../../models/Order");

const placeOrder = async (req, res) => {
    try {
        const orderData = await req.body;

        if (orderData.totalQuantity > orderData.maxQuantity) {
            return res.status(400).json({ message: `Total quantity should not exceed maximum quantity alloted.` });
        }

        const order = await Order.create(orderData);
        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: `Failed to place order ${error}` });
    }
}

module.exports = { placeOrder };

