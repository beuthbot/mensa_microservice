const express = require('express')
const path = require('path')

const router = new express.Router()

router.get('/', async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname + '/../src/dist/index.html'))
    } catch (err) {
        next(err)
    }
})

module.exports = router
