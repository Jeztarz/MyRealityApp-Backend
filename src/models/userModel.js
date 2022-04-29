const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {type: String,
                    required: [true, 'Username required']},
        password: {type: String, 
                   validate: {
                    validator: function(v) {
                        // (?=.*\d) = checks if a digit exists using a positive lookahead., (?=.*[a-z]) = check a lower-case, 
                        // (?=.*[A-Z]) = check a upper-case, (?=.*[0-9]) = check a number, .{8,16} = Min 8 max 16
                      return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}/.test(v);
                    },
                    message: `Password must be contain lower character, capital character and number!`
                    },
                   required: [true, 'Password required'],
        },
        displayName: {
            type: String,
            default: ''
        },
        aboutMe: {
            type: String,
            default: ''
        },
        favorite: {
            type: String,
            default: ''
        },
        durationGoal: {type: Number, min: [0, 'Duration Goal must be at least 0'], default: 0},
        caloriesGoal: {type: Number, min: [0, 'Calories Goal must be at least 0'], default: 0},
        records: [{
            activityName: { type: String},
            timestamp: {type : Date},
            duration: {type: Number, min: [0, 'Duration must be at least 0']},
            calories: {type: Number, min: [0, 'Calories must be at least 0']},
            description: {type: String},
        }],
    }
);

const UserModel = mongoose.model('user', userSchema, 'users');

module.exports = UserModel;