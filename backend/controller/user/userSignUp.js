// const userModel = require("../../models/userModel");
// const bcrypt = require('bcryptjs');

// async function userSignUpController(req, res) {
//     try {
//         // Step 1: Destructure the data from the request body
//         const { email, password, name, confirmPassword } = req.body;

//         // Step 2: Validate the incoming data
//         if (!email || !password || !name || !confirmPassword) {
//             throw new Error("Please provide all required fields: name, email, password, and confirmPassword.");
//         }

//         // Email Validation: Check if the email is in a valid format
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             throw new Error("Email format is invalid.");
//         }

//         // Password Complexity: Require passwords to include a combination of Uppercase letters, Lowercase letters, Numbers, Special characters
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
//         if (!passwordRegex.test(password)) {
//             throw new Error("Password must include a combination of: Uppercase letters, Lowercase letters, Numbers, Special characters (e.g.,!, @, #, $).");
//         }

//         const minPasswordLength = 8;
//         if (password.length < minPasswordLength) {
//             throw new Error(`Password length must be at least ${minPasswordLength} characters.`);
//         }

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             throw new Error("Passwords do not match.");
//         }

//         // Step 3: Check if the user already exists
//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) {
//             throw new Error("User with this email already exists.");
//         }

//         // Step 4: Password encryption
//         const salt = bcrypt.genSaltSync(10);
//         const hashPassword = bcrypt.hashSync(password, salt);

//         if (!hashPassword) {
//             throw new Error("Password encryption failed.");
//         }

//         // Step 5: Create new user
//         const newUser = new userModel({
//             ...req.body,
//             role: "GENERAL",
//             password: hashPassword,
//             confirmPassword: hashPassword, // Not typically stored, but included based on your structure
//         });

//         // Update password history for the newly registered user
//         newUser.passwordHistory = [hashPassword];
//         // Trim the password history to a specific depth (e.g., last 5 passwords)
//         const passwordHistoryDepth = 5;
//         newUser.passwordHistory = newUser.passwordHistory.slice(-passwordHistoryDepth);

//         // Step 6: Save user and respond
//         const savedUser = await newUser.save();
//         res.status(201).json({
//             data: savedUser,
//             success: true,
//             message: "User created successfully!"
//         });

//     } catch (err) {
//         res.status(400).json({
//             message: err.message || "Server Error",
//             error: true,
//             success: false,
//         });
//     }
// }

// module.exports = userSignUpController;


const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Encryption function
function encrypt(text) {
    const algorithm = 'aes-256-cbc'; // Encryption algorithm
    const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // Use a 32-byte key
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted; // Return IV and encrypted text
}

// Decryption function
function decrypt(text) {
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

async function userSignUpController(req, res) {
    try {
        const { email, password, name, confirmPassword } = req.body;

        if (!email || !password || !name || !confirmPassword) {
            throw new Error("Please provide all required fields: name, email, password, and confirmPassword.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Email format is invalid.");
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(password)) {
            throw new Error("Password must include a combination of: Uppercase letters, Lowercase letters, Numbers, Special characters (e.g.,!, @, #, $).");
        }

        const minPasswordLength = 8;
        if (password.length < minPasswordLength) {
            throw new Error(`Password length must be at least ${minPasswordLength} characters.`);
        }

        if (password !== confirmPassword) {
            throw new Error("Passwords do not match.");
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error("User with this email already exists.");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const encryptedEmail = encrypt(email);  // Encrypt the email
        const encryptedName = encrypt(name);    // Encrypt the name

        const newUser = new userModel({
            name: encryptedName,
            email: encryptedEmail,
            role: "GENERAL",
            password: hashPassword,
            confirmPassword: hashPassword, // Not typically stored, but included based on your structure
        });

        newUser.passwordHistory = [hashPassword];
        const passwordHistoryDepth = 5;
        newUser.passwordHistory = newUser.passwordHistory.slice(-passwordHistoryDepth);

        const savedUser = await newUser.save();
        res.status(201).json({
            data: savedUser,
            success: true,
            message: "User created successfully!"
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || "Server Error",
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;

