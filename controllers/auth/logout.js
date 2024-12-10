const logout = (req, res) => {
    res.clearCookie('jwtoken', { path: '/', httpOnly: true, sameSite: 'None', secure: true });
    return res.status(200).json({ message: "Logged out successfully" });
}

module.exports = { logout };