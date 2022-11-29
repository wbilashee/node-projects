const User = require("../models/User");

const register = (req, res) => {
    let { username, password } = req.body;
    const user = new User({ username });

    User.register(user, password, function (err, user) {
        if (err) {
            res.json({ success: false, message: "Your account could not be saved. Error: " + err });
        }
        else {
            req.login(user, (err) => {
                if (err) {
                    res.json({ success: false, message: err });
                }
                else {
                    res.redirect("/");
                }
            });
        }
    });
}

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.status(200).json({ msg: "User logged out" });
    });
}

module.exports = {
    register,
    logout,
}