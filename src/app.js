// require("dotenv").config();
// const mongoose = require('mongoose');
// const express = require('express');
// const cors = require('cors');
// const passport = require('passport');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const bodyParser = require('body-parser');

// const userRouter = require('./routes/user');

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: "http://localhost:3000", 
//     credentials: true,
//   })
// );
// app.use(
//   session({
//     secret: process.env.SECRETCODE_SESSION,
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// app.use(cookieParser("secretcode"));
// app.use(passport.initialize());
// app.use(passport.session());
// require("./passports/passportConfig")(passport);


// app.use('/users', userRouter);
require("dotenv").config();
const mongoose = require('mongoose');
const app = require('../api/index');

const boot = async () => {
    const URI = 'mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.PASSWORD + '@' + process.env.PROJECT_NAME + '.mongodb.net/' + process.env.DATABASE_NAME + '?retryWrites=true&w=majority'
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    app.listen(3000, () => {
        console.log('Server is running');
    }); 
};

boot();