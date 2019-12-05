const express = require('express')
const router = express.Router()
const answer = require('../data/answer.json')

router.get('/', (req, res, next) => {
    // res.setHeader('Content-Type', 'application/json')
    console.log(answer)
    res.format({
        'text/plain': () => {
            res.send(answer.content)
        }
    })
})

module.exports = router
