const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    jobTitle: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
