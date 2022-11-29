const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "Please provide username"],
    },
    admin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);