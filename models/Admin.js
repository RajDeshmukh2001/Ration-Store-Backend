const mongoose = require('mongoose');
const generateToken = require('../utils/generateToken');
const hashPassword = require('../middleware/hashPassword');
const comparePassword = require('../utils/comparePassword');

const adminSchema = new mongoose.Schema(
    {
        fullname: { type: String, required: true },
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: true },
    },
    {
        timestamps: true
    }
);

adminSchema.pre('save', hashPassword);

adminSchema.methods.generateAuthToken = generateToken;

adminSchema.methods.matchPassword = comparePassword;

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
module.exports = Admin;