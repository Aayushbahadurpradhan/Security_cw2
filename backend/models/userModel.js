const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // Make sure to include bcrypt if you want to use it for password hashing
const jwt = require('jsonwebtoken'); // Make sure to include jwt if you want to use it for token generation
const crypto = require('crypto');    // Make sure to include crypto if you want to use it for generating reset tokens

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String
    },
    role: {
        type: String
    },
    failedLoginAttempts: {
        type: Number,
        default: 0
    },
    accountLocked: {
        type: Boolean,
        default: false
    },
    lastFailedLoginAttempt: {
        type: Date,
        default: null
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },
    passwordHistory: [
        {
            type: String,
            required: true
        }
    ]
}, {
    timestamps: true
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Set expire
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
