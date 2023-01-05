const express = require("express")
const axios = require("axios")
const { API_KEY } = require("../../../config")
const logger = require("../logger")

const router = new express.Router()

// async functions do not block the main thread
router.get("/", async (req, res) => {
    const reqId = req.query.reqId
    logger.info(`Request received: ${reqId}`)

    const cityId = req.query.cityId

    if (isNaN(cityId)) {
        return res.status(400).send({ error: "City id should be a number" })
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${API_KEY}`

    try {
        const response = await axios.get(url)
        logger.info(`Request ${reqId} finished.`)
        res.send(response.data)
    }
    catch (e) {
        const code = e.response.status
        const message = e.response.data.message
        logger.info(`Request ${reqId} finished with error.`)
        res.status(Number(code)).send({ error: message })
    }
})

module.exports = router