const passport = require('passport');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const register = async (req, res) => {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new BadRequestError('Please provide all values');
    }

    const user = await new User({ username, email });

    await User.register(user, password, function (err, user) {
        if (err) {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    success: false,
                    message: "Your account could not be saved. Error: ", err,
                });
        } else {
            req.user = user;
            res
                .status(StatusCodes.CREATED)
                .json({
                    success: true,
                    message: "Your account is saved",
                });
        }
    });
}

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequestError('Please provide all values');
    }

    await passport.authenticate('local', function (err, user, info) {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!user) {
                res.json({ success: false, message: 'username or password incorrect' });
            } else {
                req.login(user, function (err) {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        req.user = user;
                        res
                            .status(StatusCodes.OK)
                            .json({ success: true, message: "Authentication successful" });
                    }
                });
            }
        }
    })(req, res);
}

const logout = async (req, res) => {
    await req.logOut();
    await req.session.destroy(err => {
        if (err) {
            console.log(err);
        }
        res.clearCookie('user_id');
        res.status(StatusCodes.OK).json({ msg: 'User logged out' });
    });
}

const getUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
}

module.exports = {
    register,
    login,
    logout,
    getUser,
}