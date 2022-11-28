const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Please provide name'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
    },
}, { timestamps: true });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);