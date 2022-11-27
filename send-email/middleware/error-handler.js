const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
    console.log(err);
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Something went wrong, try again later" });
}

module.exports = errorHandler;