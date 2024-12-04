const mongoose = require('mongoose');

const rationItemsShcema = new mongoose.Schema(
    {
        itemname: { type: String, required: true },
        prices: {
            Antyodaya_Anna_Yojana: { type: Number, required: true },
            Priority_Household: { type: Number, required: true },
            Above_Poverty_Line: { type: Number, required: true },
            Below_Poverty_Line: { type: Number, required: true },
        }
    },
    {
        timestamps: true,
    }
)

const RationItem = mongoose.models.RationItem || mongoose.model('RationItem', rationItemsShcema);
module.exports = RationItem;