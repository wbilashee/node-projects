const express = require("express");
const passport = require("passport");
const router = express.Router();
const { isAuth, isAdmin } = require("../middleware/auth");

const {
    register,
    logout,
} = require("../controllers/user");

router
    .get("/", isAuth, (req, res) => {
        res.render("dashboard.ejs");
    });

router
    .get("/user", isAuth, (req, res) => {
        res.status(200).json({ user: req.user });
    });

router
    .get("/admin", isAdmin, (req, res) => {
        res.status(200).json({ msg: "You are a admin" });
    });

router
    .route("/register")
    .get((req, res) => {
        res.render("register.ejs");
    })
    .post(register);

router
    .get("/login", (req, res) => {
        res.render("login.ejs");
    });

router
    .post("/login",
        passport.authenticate("local", { failureRedirect: "/login", failureMessage: true }),
        function (req, res) {
            res.redirect("/");
        });

router
    .route("/logout")
    .post(logout);

module.exports = router;