const logActivity = require("../../utils/logActivity");

async function userLogout(req, res) {
    try {
        // Define the cookie options
        const tokenOption = {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        };

        // Clear the token cookie
        res.clearCookie("token", tokenOption);

        // Destroy session if you're using session middleware
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    console.log("Session destruction error:", err);
                }
            });
        }

        // Log the logout activity
        const username = req.user ? req.user.username : req.ip;
        const userId = req.user ? req.user.id : req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        logActivity(`User logged out: ${username}`, 'logout', userId);

        // Respond with a success message
        res.status(200).json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        });
    } catch (err) {
        // Log the logout failure
        const username = req.user ? req.user.username : req.ip;
        const userId = req.user ? req.user.id : req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        logActivity(`Logout failed: ${username}`, 'logout_failure', userId);

        // Respond with an error message
        res.status(500).json({
            message: err.message || "Logout failed",
            error: true,
            success: false,
        });
    }
}

module.exports = userLogout;
