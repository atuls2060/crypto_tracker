
const Validator = (req, res, next) => {
    const userData = req.body;

    if (!userData.email || !userData.password || (req.url === "/register" && !userData.username)) {
        res.status(400).send({
            error: "Validation Error",
            message: "All fields required"
        })
    } else if (req.url === "/register" && userData.password.length < 6) {
        res.status(400).send({
            error: "Validation Error",
            message: "password should be at least 6 characters"
        })
    } else {
        next()
    }
}

module.exports = {
    Validator
}