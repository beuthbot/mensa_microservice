const express = require('express')
const router = express.Router()
const mealsOfSpecificDayService = require('../services/mealsOfSpecificDayService')
const generatedMessage = require('../services/generateResponse')

router.post('/', async (req, res, next) => {
    let message = req.body
    let dateOfMessage = message.evaluatedMessage.date
    let mealFilters = message.evaluatedMessage.filter

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
})

module.exports = router
