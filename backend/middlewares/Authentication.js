const jwt = require("jsonwebtoken")

const Authentication = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        res.status(401).send({
            error: "Access Denied",
            message: "Provide Token"
        })
    } else {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    error: "Access Denied",
                    message: err.message
                })
            }
            if (decoded) {
                req.body.userId = decoded._id
                next()
            } else {
                res.status(401).send({
                    error: "Access Denied",
                    message: "Expired or Wrong token"
                })
            }
        })
    }
}

module.exports = {
    Authentication
}