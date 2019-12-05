const express = require('express')
const router = express.Router()
const answer = require('../data/answer.json')

router.get('/', (req, res, next) => {
    // Message-Objekt kommt per Post an
    // Lesen evaluatedMessage-Property aus
    // Lesen Datum und Filter aus
    // Wenn Datum = aktueller Tag => dann filternAusCacheObject()
    // Sonst request and MensaAPI für das gegebene Datum => dann filtern() + generateAnswer() passiert
    // getMealsOfASpecificDay.js in /services
    // Dann Response an Message-Objekt anfügen und zurückschicken
    console.log(answer)
    res.format({
        'text/plain': () => {
            res.send(answer.content)
        }
    })
})

module.exports = router
