require("dotenv").config();
require("express-async-errors");
const express = require("express");
const passport = require("passport");
const flash = require("connect-flash");
const router = require("./routes/user");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 1000 * 60 * 60 * 24,
});
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

require("./config/passport");
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use(passport.authenticate("session"));

app.use("/", router);
app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
    console.log(`Server is listening on port 5000...`);
});