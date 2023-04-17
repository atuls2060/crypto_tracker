const mongoose = require("mongoose");

async function connection() {
    mongoose.connect(process.env.MONGOURL)
}

module.exports = {
    connection
}