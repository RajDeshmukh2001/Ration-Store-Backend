const User = require("../../models/User");

const updateUserProfile = async (req, res) => {
    try {
        const id = await req.params.id;

        const formData = await req.body;
        const { fullname, email, phone, RFID, rationCardType, familyMembers, address } = formData;

        if (!fullname || !email || !phone || !RFID || !rationCardType || !familyMembers || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(formData.fullname)) {
            return res.status(400).json({ message: "Fullname must contain only letters and spaces" });
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number" });
        }

        const isRFIDExists = await User.findOne({ RFID, _id: { $ne: id } }); // $ne = not equal
        if (isRFIDExists) {
            return res.status(400).json({ message: 'User with same RFID already exists' });
        }

        const updateUser = await User.findByIdAndUpdate(
            id,
            { fullname, email, phone, RFID, rationCardType, familyMembers, address }
        );

        if (updateUser) {
            return res.status(201).json({ message: 'Profile updated successfully' });
        } else {
            return res.status(400).json({ message: 'Something went wrong. Try again' });
        }
    } catch (error) {
        res.status(400).json({ message: `Internal Server error. ${error}` });
    }
}

module.exports = { updateUserProfile }