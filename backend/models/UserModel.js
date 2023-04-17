const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },

    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        min: [6, 'password should be at least 6 characters'],
        required: [true, 'Password is required']
    }
})

const UserModel = mongoose.model("Users", UserSchema)


module.exports = {
    UserModel
}