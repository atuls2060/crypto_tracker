const mongoose = require("mongoose");

const WatchListSchema = mongoose.Schema({
    coinId: {
        type: String,
        required: [true, 'Coin id is required']
    },
    userId: {
        type: String,
        required: [true, 'User id id is required']
    }
})

const WatchListModel = mongoose.model("Watchlist", WatchListSchema)


module.exports = {
    WatchListModel
}