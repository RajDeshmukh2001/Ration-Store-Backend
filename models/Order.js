const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        customer: {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            RFID: { type: String },
            rationCardType: { type: String },
            totalFamilyMembers: { type: Number }
        },
        maxQuantity: { type: Number },
        totalQuantity: { type: Number },
        totalPrice: { type: Number },
        orderItems: [
            {
                item: { type: String },
                itemPrice: { type: Number },
                itemTotalQuantity: { type: Number },
                itemTotalPrice: { type: Number }
            }
        ],
        status: { type: String, default: 'pending' }
    },
    {
        timestamps: true,
    }
)

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
module.exports = Order;