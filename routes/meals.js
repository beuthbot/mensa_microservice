const express = require('express')
const router = express.Router()
const answer = require('../data/answer.json')
const todaysDate = require('../services/dateService')
const mealsOfSpecificDayService = require('../services/mealsOfSpecificDayService')
const generatedMessage = require('../services/generateResponse')

router.post('/', async (req, res, next) => {
    // Message-Objekt kommt per Post an
    // Lesen evaluatedMessage-Property aus
    // Lesen Datum und Filter aus
    // Wenn Datum = aktueller Tag => dann filternAusCacheObject()
    // Sonst request and MensaAPI für das gegebene Datum => dann filtern() + generateAnswer() passiert
    // getMealsOfASpecificDay.js in /services
    // Dann Response an Message-Objekt anfügen und zurückschicken
    let message = req.body
    let dateOfMessage = message.evaluatedMessage.date
    let mealFilters = message.evaluatedMessage.filter
    console.log(mealFilters)

    if (dateOfMessage === undefined || dateOfMessage === '') {
        let answerText =
            'Sorry, ich konnte leider kein Datum feststellen. Gib bitte ein Datum an für das du den Mensaplan haben willst.'
        message.answer = { content: answerText, history: 'MensaService' }
        res.send(message)
    } else {
        if (!Array.isArray(mealFilters)) {
            mealFilters = [mealFilters]
        } else if (mealFilters === undefined) {
            mealFilters = ['']
        } else {
            let meals = await mealsOfSpecificDayService.filterMeals(
                mealFilters,
                dateOfMessage
            )
            let answerText = await generatedMessage.generateSpecificDayAnswer(
                meals
            )
            message.answer = { content: answerText, history: 'MensaService' }
            res.send(message)
        }
    }

    console.log(mealFilters)

    // res.send(message)
    // console.log('Yay its the same!')
    // console.log(message)

    // if (dateOfMessage !== todaysDate) {
    //     let meals = await mealsOfSpecificDayService.filterMeals(
    //         mealFilters,
    //         dateOfMessage
    //     )
    //     let answerText = await generatedMessage.generateSpecificDayAnswer(meals)

    //     res.format({
    //         'text/plain': () => {
    //             res.send(answerText)
    //         }
    //     })
    //     // console.log(answerText)
    //     // console.log(meals)
    // } else {
})

module.exports = router
