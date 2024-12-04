const authAccount = (req, res) => {
    try {
        if (req.account && req.token) {
            const account = req.account;
            const token = req.token;
            
            return res.status(200).json({ message: "Authorized Person", account, token });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = { authAccount };