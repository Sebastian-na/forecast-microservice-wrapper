const express = require("express")
const forecast = require("./routes/forecast")

const router = express.Router()

router.use("/forecast", forecast)

module.exports = router