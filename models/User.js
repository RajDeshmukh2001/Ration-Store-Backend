const mongoose = require('mongoose');
const generateToken = require('../utils/generateToken');
const hashPassword = require('../middleware/hashPassword');
const comparePassword = require('../utils/comparePassword');

const userSchema = new mongoose.Schema(
    {
        fullname: { type: String },
        email: { type: String, required: true, unique: true },
        phone: { type: Number, required: true },
        password: { type: String, required: true },
        address: { type: String },
        RFID: { type: String },
        rationCardType: { type: String },
        familyMembers: { type: Number },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', hashPassword);

userSchema.methods.generateAuthToken = generateToken;

userSchema.methods.matchPassword = comparePassword;

const Users = mongoose.models.Users || mongoose.model('Users', userSchema);
module.exports = Users;