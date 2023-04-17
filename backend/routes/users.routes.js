const userRouter = require("express").Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/UserModel");

userRouter.post("/register", async (req, res) => {
    const userData = req.body;
    const user = await UserModel.findOne({ email: userData.email })
    if (user) {
        res.status(409).send({
            error: "Can't Register",
            message: "User already exist, please login"
        })
    } else {
        bcrypt.hash(userData.password, 5, (err, hash) => {
            if (err) {
                res.status(500).send({
                    error: "Can't Register",
                    message: err.message
                })
            } else {
                const user = new UserModel({ ...userData, password: hash })
                user.save()
                jwt.sign({ _id: user._id }, process.env.SECRET, (err, token) => {
                    if (err) {
                        res.status(500).send({
                            error: "Can't Register",
                            message: err.message
                        })
                    }
                    res.send({
                        message: "User Registered Successfully",
                        token,
                        username: user.username
                    })
                })
            }
        })
    }
})


userRouter.post("/login", async (req, res) => {
    const userData = req.body;
    const user = await UserModel.findOne({ email: userData.email })
    if (user) {
        bcrypt.compare(userData.password, user.password, (err, result) => {
            if (err) {
                res.status(500).send({
                    error: "Can't login",
                    message: err.message
                })
            } else if (result) {
                jwt.sign({ _id: user._id }, process.env.SECRET, (err, token) => {
                    if (err) {
                        res.status(500).send({
                            error: "Can't login",
                            message: err.message
                        })
                    }
                    res.send({
                        message: "Logged in Successfully",
                        token,
                        username: user.username
                    })
                })

            } else {
                res.status(401).send({
                    error: "Can't Login",
                    message: "Email or password is inncorrect"
                })
            }
        })

    } else {
        res.status(404).send({
            error: "Can't Login",
            message: "User not found"
        })
    }
})

module.exports = {
    userRouter
}
