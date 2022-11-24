require("dotenv").config();
require("express-async-errors");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const notFound = require("./middleware/not-found");
const authenticateUser = require("./middleware/auth");
const errorHandler = require("./middleware/error-handler");

// middleware
app.set("trust proxy", 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 request per windows
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();