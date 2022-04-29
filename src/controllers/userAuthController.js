const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const passport = require("passport");

exports.registerUser = (req, res) => {
  UserModel.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.status(409).send("User Already Exists");
    if (!doc) {
      let newUser = new UserModel({
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName
      });
      const errors = await newUser.validateSync();
      if(errors) {
        const errorFieldNames= Object.keys(errors.errors);
        if (errorFieldNames.length > 0) {
            return res.send(errors.errors[errorFieldNames[0]].message);
        }
      };
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      newUser = new UserModel({
        username: req.body.username,
        password: hashedPassword,
        displayName: req.body.displayName,
        records: []
      });
      await newUser.save();
      res.send("User Created");
    };
  });
};

exports.loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.session);
      });
    };
  })(req, res, next);
};

exports.logoutUser = (req, res) => {
  req.logOut();
  req.session.destroy();
};