const UserModel = require('../models/userModel');

exports.getRecords = async (req, res)=> {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    res.send(user.records);
};

exports.postRecord = async (req, res)=> {
    const userId = req.user.id;
    const body = req.body;
    const user = await UserModel.findById(userId);
    user.records.push(body);
    const errors = await user.validateSync();
    if(errors) {
        const errorFieldNames= Object.keys(errors.errors);
        if (errorFieldNames.length > 0) {
            return res.status(400).send(errors.errors[errorFieldNames[0]].message);
        }
    };
    await user.save();
    return res.status(201).send(user.records);
};

exports.updateRecord = async (req, res)=> {
    const userId = req.user.id;
    const body = req.body;
    const user = await UserModel.findById(userId);
    const updatedRecord = await user.records.map((record) => {
        if(record._id.toString() === req.params.recordId) {
            record.activityName = body.activityName;
            record.timestamp = body.timestamp;
            record.duration = body.duration;
            record.calories = body.calories;
            record.description = body.description;
            return record
        };
        return record
    });
    user.records = updatedRecord;
    await user.save();
    return res.status(201).send(updatedRecord.records);
};

exports.deleteRecord = async (req, res)=> {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    const updateRecords = user.records.filter((record) => {

        return record._id.toString() !== req.params.recordId
    });
    user.records = updateRecords;
    await user.save();
    return res.status(204).send(user.records);
};

exports.getRecordByID = async (req, res)=> {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);
    const RecordbyID = user.records.filter((record) => {
        return record._id.toString() === req.params.recordId
    });
    res.send(RecordbyID);
};