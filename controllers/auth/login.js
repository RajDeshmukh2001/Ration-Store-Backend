const User = require("../../models/User");
const Admin = require("../../models/Admin");

const login = async (req, res) => {
    try {
        const formData = await req.body;
        const { email, password, isAdmin } = formData;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const account = isAdmin ? await Admin.findOne({ email }) : await User.findOne({ email });
        if (!account) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const comparePassword = await account.matchPassword(password);
        if (!comparePassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = account.generateAuthToken();

        res.cookie('jwtoken', token, {
            maxAge: 3600000,
            httpOnly: true,
            sameSite: 'Lax',
        });

        res.status(200).json({ message: 'Login successfull', account, token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error: ", error });
    }
}

module.exports = { login };