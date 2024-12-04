const logout = (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    return res.status(200).json({ message: "Logged out successfully" });
}

module.exports = { logout };