const UserModel = require('../models/userModel');

exports.checkSession = async (req, res, next) => {
    // console.log("Checker",req)
    console.log(req.session);
    // console.log("Checker",req.sessionStore);
     if(!req.session.passport) {
         res.status(401).send("Don't have permission to access data")
     } else {
        return next();
     }
}

exports.checkRecord = async (req, res, next) => { 
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    const checkedRecords = user.records.filter((record) => {
        return record._id.toString() === req.params.recordId
    });
    if (!(checkedRecords.length === 1)) {
        return res.status(404).send('Record not found');
    };
    return next();
}