const User = require('../../models/User');

const userRegistration = async (req, res) => {
    try {
        const formData = await req.body;
        const { email, phone, password, cpassword } = formData;

        if (!email || !phone || !password || !cpassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number" });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number." });
        }

        if (password !== cpassword) {
            return res.status(400).json({ message: "Passwords not matching" });
        }

        const user = new User({ email, phone, password });
        const register = await user.save();
        const token = user.generateAuthToken();

        if (register) {
            res.cookie('jwtoken', token, {
                maxAge: 3600000,
                httpOnly: true,
                sameSite: 'None',
                secure: true, 
            });

            return res.status(200).json({ message: "Registration successfull", userData: user });
        } else {
            return res.status(500).json({ message: "Registration failed" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error: ", error });
    }
}

module.exports = { userRegistration };