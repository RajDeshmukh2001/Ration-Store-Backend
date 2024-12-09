const Order = require("../../models/Order");
const User = require("../../models/User");

const getSingleUser = async (req, res) => {
    try {
        const id = req.params.id;

        const user = await User.findById({ _id: id });
        const orders = await Order.find({ 'customer.userId': id });
        res.status(200).json({ user, orders });
    } catch (error) {
        res.status(500).json({ message: "Internal server error: ", error });
    }
}

module.exports = { getSingleUser };