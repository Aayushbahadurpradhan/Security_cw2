// const User = require('../../models/userModel');
// const bcrypt = require('bcryptjs'); // Ensure bcrypt is imported

// // Update password
// async function updatePassword(req, res, next) {
//     const { currentPassword, newPassword, confirmPassword } = req.body;
//     const userId = req.userId; // Use req.userId set by authToken middleware

//     try {
//         // Find the user by ID
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Validate current password
//         if (!currentPassword || !user.password) {
//             return res.status(400).json({ error: "Current password is required" });
//         }

//         // Compare the current password with the stored hashed password
//         const passwordMatch = await bcrypt.compare(currentPassword, user.password);
//         if (!passwordMatch) {
//             return res.status(400).json({ error: "Incorrect current password" });
//         }

//         // Check if the new password and confirm password match
//         if (newPassword !== confirmPassword) {
//             return res.status(400).json({ error: "New password and confirm password do not match" });
//         }

//         // Check if the new password is different from the current password
//         if (currentPassword === newPassword) {
//             return res.status(400).json({
//                 error: "New password must be different from the current password",
//             });
//         }

//         // Check if the new password is in the password history
//         const isPasswordInHistory = await Promise.all(
//             user.passwordHistory.map(async (oldPassword) => {
//                 return await bcrypt.compare(newPassword, oldPassword);
//             })
//         );

//         if (isPasswordInHistory.includes(true)) {
//             return res.status(400).json({
//                 error: "New password cannot be one of the recent passwords",
//             });
//         }

//         // Hash the new password
//         const hashedNewPassword = await bcrypt.hash(newPassword, 10);

//         // Update the user's password and password history
//         user.password = hashedNewPassword;
//         user.passwordChangeDate = new Date();

//         // Update the password history and trim to the last 5 passwords
//         user.passwordHistory.push(hashedNewPassword);
//         const passwordHistoryDepth = 5;
//         user.passwordHistory = user.passwordHistory.slice(-passwordHistoryDepth);

//         // Save the updated user data
//         await user.save();

//         res.status(200).json({ message: "Password updated successfully" });
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = updatePassword;



const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');

// Update password
async function updatePassword(req, res, next) {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.userId; // Use req.userId set by authToken middleware

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Validate current password
        if (!currentPassword || !user.password) {
            return res.status(400).json({ error: "Current password is required" });
        }

        // Compare the current password with the stored hashed password
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Incorrect current password" });
        }

        // Check if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "New password and confirm password do not match" });
        }

        // Check if the new password is different from the current password
        if (currentPassword === newPassword) {
            return res.status(400).json({
                error: "New password must be different from the current password",
            });
        }

        // Check if the new password is in the password history
        const isPasswordInHistory = await Promise.all(
            user.passwordHistory.map(async (oldPassword) => {
                return await bcrypt.compare(newPassword, oldPassword);
            })
        );

        if (isPasswordInHistory.includes(true)) {
            return res.status(400).json({
                error: "New password cannot be one of the recent passwords",
            });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and password history
        user.password = hashedNewPassword;
        user.passwordChangeDate = new Date();

        // Update the password history and trim to the last 5 passwords
        user.passwordHistory.push(hashedNewPassword);
        const passwordHistoryDepth = 5;
        user.passwordHistory = user.passwordHistory.slice(-passwordHistoryDepth);

        // Save the updated user data
        await user.save();

        // Clear the session or JWT token
        res.clearCookie('token'); // Assuming you are storing the JWT token in a cookie

        // Send a response indicating success and the need to redirect to the login page
        res.status(200).json({ message: "Password updated successfully", redirect: true });
    } catch (error) {
        next(error);
    }
}

module.exports = updatePassword;

