const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        console.log("Token:", token); // Debugging log for token

        if (!token) {
            return res.status(401).json({
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            if (err) {
                console.log("Error auth:", err);
                return res.status(403).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false
                });
            }

            req.userId = decoded._id;  // Correctly set req.userId to the decoded token's _id

            console.log("Decoded:", decoded); // Debugging log for decoded token
            next();
        });

    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
