const express = require('express');
const router = express.Router();

const {
    register,
    login,
    logout,
    getUser,
} = require('../controllers/auth');

router
    .route('/')
    .get((req, res) => {
        res.render('dashboard.ejs', { user: req.user });
    });

router
    .route('/user')
    .get(getUser);

router
    .route('/register')
    .get((req, res) => {
        res.render('register.ejs');
    })
    .post(register);

router
    .route('/login')
    .get((req, res) => {
        res.render('login.ejs');
    })
    .post(login);

router
    .route('/logout')
    .delete(logout);

module.exports = router;