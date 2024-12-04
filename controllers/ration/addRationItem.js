const RationItem = require("../../models/RationItems");

const addRationItem = async (req, res) => {
    try {
        const { itemname, AAY, PHH, APL, BPL } = req.body;

        if (!itemname || AAY === undefined || PHH === undefined || APL === undefined || BPL === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (isNaN(AAY) || isNaN(PHH) || isNaN(APL) || isNaN(BPL)) {
            return res.status(400).json({ message: "Prices must be valid numbers" });
        }

        const itemExists = await RationItem.findOne({ itemname });
        if (itemExists) {
            return res.status(400).json({ message: "This ration item already exists" });
        }

        const item = new RationItem({
            itemname,
            prices: {
                Antyodaya_Anna_Yojana: Number(AAY),
                Priority_Household: Number(PHH),
                Above_Poverty_Line: Number(APL),
                Below_Poverty_Line: Number(BPL),
            },
        });
        const itemAdded = await item.save();

        if (itemAdded) {
            return res.status(200).json({ message: "Ration item added successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error: ", error });
    }
}

module.exports = { addRationItem };