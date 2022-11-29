const { StatusCodes } = require("http-status-codes");

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: "You are not authorized to view this resource" });
    }
}

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: "You are not authorized to view this resource because you are not an admin." });
    }
}

module.exports = {
    isAuth,
    isAdmin,
}