const RationItem = require("../../models/RationItems");

const getRationItems = async (req, res) => {
    try {
        const rationItems = await RationItem.find({});
        res.status(200).json(rationItems);
    } catch (error) {
        res.status(500).json({ message: "Internal server error: ", error });
    }
}

module.exports = { getRationItems };