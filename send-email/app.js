require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const { sendEmail } = require("./controllers/sendEmail");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// routes
app.get("/", (req, res) => {
    res.send("<a href='/send'>Send Email</a>");
});

// middleware
app.use(express.json());
app.use("/send", sendEmail);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();