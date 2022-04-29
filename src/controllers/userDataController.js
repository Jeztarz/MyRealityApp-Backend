const UserModel = require('../models/userModel');

exports.getUserData = (req, res) => {
    res.send(req.user); 
};

exports.updateUserData = async(req, res) => {
    const userId = req.user.id;
    const body = req.body 
    const user = await UserModel.findById(userId);
    user.aboutMe = body.aboutMe;
    user.favorite = body.favorite;
    user.displayName = body.displayName;
    user.durationGoal = body.durationGoal;
    await user.save();
    return res.status(201).send();
};