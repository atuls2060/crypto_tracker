const watchListRouter = require("express").Router();
const { default: axios } = require("axios");
const { WatchListModel } = require("../models/WatchListModel");
const { default: mongoose } = require("mongoose");



watchListRouter.get("/", async (req, res) => {
    let { userId, currency } = req.body
    try {
        const coinIds = await WatchListModel.find({ userId })
        if (coinIds.length > 0) {
            const Ids = coinIds.map((coin) => coin.coinId)
            if (!currency) {
                currency = "usd"
            }
            const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${Ids.join()}`;
            let { data } = await axios.get(url)
            res.send(data)
        } else {
            res.send([])
        }

    } catch (error) {
        res.status(500).send({
            error: "Can't get Your WatchList",
            message: "Something went wrong!",
        })
    }
})
watchListRouter.post("/", async (req, res) => {
    const { coinId, userId } = req.body
    if (coinId && userId) {
        try {
            const coinExists = await WatchListModel.findOne({ coinId, userId })
            if (coinExists) {
                res.status(409).send({
                    error: "Can't Add into your WatchList",
                    message: "Coin already exist in your WatchList!"
                })
            } else {
                const coin = new WatchListModel({ coinId, userId })
                await coin.save();
                res.send({
                    message: "Added into your WatchList!",
                })
            }
        } catch (error) {
            res.status(400).send({
                error: "Can't Add Coin into Your WatchList",
                message: "Something went wrong!",
            })
        }

    } else {
        res.status(400).send({
            error: "Can't Add Coin into Your WatchList",
            message: "Something went wrong!",
        })
    }
})



watchListRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body

    try {
        await WatchListModel.deleteOne({ coinId: id, userId });
        res.send({
            message: "Deleted Successfully",
        })
    } catch (error) {
        res.status(400).send({
            error: "Can't Delete",
            message: "Something went wrong!",
        })
    }

})



module.exports = {
    watchListRouter
}
