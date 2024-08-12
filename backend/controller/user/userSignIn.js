const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const logActivity = require("../../utils/logActivity"); // Import the logActivity function

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        // Validate input fields
        if (!email) {
            throw new Error("Please provide an email.");
        }
        if (!password) {
            throw new Error("Please provide a password.");
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            await logActivity(null, 'login_failed', { email }); // Log failed login attempt
            throw new Error("User not found.");
        }

        // Check if account is locked
        if (user.accountLocked) {
            const lockoutDurationMillis = Date.now() - user.lastFailedLoginAttempt;
            const lockoutDurationSeconds = lockoutDurationMillis / 1000;

            if (lockoutDurationSeconds >= 120) {
                // Unlock the account after 2 minutes
                user.accountLocked = false;
                user.failedLoginAttempts = 0;
                await user.save();
            } else {
                const timeRemainingSeconds = 120 - lockoutDurationSeconds;
                const minutes = Math.floor(timeRemainingSeconds / 60);
                const seconds = Math.floor(timeRemainingSeconds % 60);

                await logActivity(user._id, 'login_failed_locked', { email }); // Log locked account login attempt
                return res.status(400).json({
                    success: false,
                    message: `Account is locked. Please try again later after ${minutes} minutes and ${seconds} seconds.`,
                });
            }
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            user.failedLoginAttempts += 1;
            user.lastFailedLoginAttempt = Date.now();

            if (user.failedLoginAttempts >= 4) {
                user.accountLocked = true;
                await user.save();
                await logActivity(user._id, 'login_failed_locked', { email }); // Log account lockout
                return res.status(400).json({
                    success: false,
                    message: "Account is locked. Please try again later.",
                });
            }

            await user.save();
            await logActivity(user._id, 'login_failed', { email }); // Log failed login attempt
            throw new Error("Invalid credentials.");
        }

        // Reset failed login attempts if successful
        user.failedLoginAttempts = 0;
        user.lastFailedLoginAttempt = null;
        await user.save();

        // Create JWT token
        const tokenData = {
            _id: user._id,
            email: user.email,
        };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

        const tokenOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        };

        // Set cookie with JWT token
        res.cookie("token", token, tokenOptions).status(200).json({
            message: "Login successful.",
            data: token,
            success: true,
            error: false,
        });

        await logActivity(user._id, 'login', { email }); // Log successful login

    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message || "An error occurred.",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;
