require('dotenv').config();
require('express-async-errors');
const express = require('express');
const passport = require('passport');
const flash = require('express-flash');
const connectDB = require('./db/connect');
const session = require('express-session');
const router = require('./routes/auth');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const initializePassport = require('./config/passport');

const app = express();
app.set('view engine', 'ejs');
initializePassport(passport);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);
app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();