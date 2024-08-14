const AuditLog = require("../models/auditlogModel");

// Function to get all audit logs
async function getAllAuditLogs() {
    try {
        return await AuditLog.find(); // Retrieves all logs
    } catch (err) {
        console.error('Error retrieving audit logs:', err);
        throw err;
    }
}

// Function to get audit logs by userId
async function getAuditLogsByUserId(userId) {
    try {
        return await AuditLog.find({ userId }); // Retrieves logs for a specific user
    } catch (err) {
        console.error('Error retrieving audit logs by user ID:', err);
        throw err;
    }
}

// Function to get audit logs by action
async function getAuditLogsByAction(action) {
    try {
        return await AuditLog.find({ action }); // Retrieves logs for a specific action
    } catch (err) {
        console.error('Error retrieving audit logs by action:', err);
        throw err;
    }
}

module.exports = {
    getAllAuditLogs,
    getAuditLogsByUserId,
    getAuditLogsByAction
};

