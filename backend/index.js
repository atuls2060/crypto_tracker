const express = require("express");
const cors = require('cors')
const { Validator } = require("./middlewares/Validator");
const { Authentication } = require("./middlewares/Authentication");
const { watchListRouter } = require("./routes/watchlist.routes");
const { userRouter } = require("./routes/users.routes");
const { connection } = require("./utils/db");
require("dotenv").config();

const app = express();
app.use(cors({
    origin: process.env.ORIGIN_URL
}))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("server running")
})

app.use("/users", Validator, userRouter)
app.use("/watchlist", Authentication, watchListRouter)


const PORT = process.env.PORT

app.listen(PORT, async () => {
    try {
        await connection()
        console.log("Connected to db")
    } catch (error) {
        console.log("error", error.message)
    }
    console.log(`server running on port ${PORT}`)
})
