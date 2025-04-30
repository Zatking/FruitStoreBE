const {AuditLog} = require('../models/schema');

const logAction = async ({ action,userId,details }) => {
    try {
       await AuditLog.create({ action,userId,details });

    }catch{
        console.error("Error logging action:", error);
    }
}

module.exports = {
    logAction,
};