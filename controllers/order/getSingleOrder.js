const Order = require("../../models/Order");
const User = require("../../models/User");

const getSingleOrder = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await Order.findById({ _id: id });
        const user = await User.findById({ _id: order.customer.userId });
        res.status(200).json({ order, user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error: ", error });
    }
}

module.exports = { getSingleOrder };