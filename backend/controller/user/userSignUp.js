const userModel = require("../../models/userModel"); // Import the user model
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const generateVerificationCode = () => Math.floor(1000 + Math.random() * 9000);

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USEREMAIL,
        pass: process.env.PASSWORD,
    },
});

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate the incoming data
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    // Password Complexity Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: "Password must include uppercase letters, lowercase letters, numbers, and special characters (e.g., !, @, #, $)."
        });
    }

    const minPasswordLength = 8;
    if (password.length < minPasswordLength) {
        return res.status(400).json({
            success: false,
            message: `Password length must be at least ${minPasswordLength} characters.`
        });
    }

    try {
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists."
            });
        }

        // Encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Generate and store verification code
        const verificationCode = generateVerificationCode();
        const tokenExpiration = Date.now() + 3600000; // 1 hour from now

        // Send verification code via email
        try {
            const mailOptions = {
                from: process.env.USEREMAIL,
                to: email,
                subject: 'Email Verification Code',
                text: `Your verification code is ${verificationCode}. This code is valid for 1 hour.`,
            };

            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error('Failed to send email:', emailError.message);
            return res.status(500).json({
                success: false,
                message: "Failed to send verification code. Please try again."
            });
        }

        // Create and save the new user
        const newUser = new userModel({
            name,
            email,
            password: encryptedPassword,
            emailVerificationToken: verificationCode,
            emailVerificationTokenExpires: tokenExpiration,
            isVerified: false,
            passwordHistory: [encryptedPassword]
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User created successfully. Please verify your email."
        });

    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({
            success: false,
            message: "Server Error. Please try again later."
        });
    }
};

const verifyEmail = async (req, res) => {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
        return res.status(400).json({
            success: false,
            message: "Email and verification code are required."
        });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (user.emailVerificationToken !== verificationCode) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification code."
            });
        }

        if (Date.now() > user.emailVerificationTokenExpires) {
            return res.status(400).json({
                success: false,
                message: "Verification code has expired. Please request a new code."
            });
        }

        user.isVerified = true;
        user.emailVerificationToken = null;
        user.emailVerificationTokenExpires = null;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully. You can now log in."
        });

    } catch (error) {
        console.error('Server Error:', error.message);
        res.status(500).json({
            success: false,
            message: "Server Error. Please try again later."
        });
    }
};

module.exports = {
    createUser,
    verifyEmail,
};
