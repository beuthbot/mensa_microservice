const express = require('express')
const router = express.Router()
const mealsOfSpecificDayService = require('../services/mealsOfSpecificDayService')
const generatedMessage = require('../services/generateResponse')

/**
 * @method post This method awaits a "message"-JSON-Object, consisting of an evaluated message and a date,
 * which will be needed to fetch the meals of the openmensa-API for the specific date. It then generates a
 * nicely formatted answer appends it to the message-object and sends it back to the sender.
 * @param req should contain the message-object in the body
 * @param res the response object containing the extended message-object, with the generated answer */
router.post('/', async (req, res, next) => {
    // the message-object itself
    let message = req.body
    // the date, for which we should fetch the meals. Format: yyyy-mm-dd or dd-mm-yyyy
    let dateOfMessage = message.evaluatedMessage.date
    // the items, after which we should filter the meals. E.g. vegetarian, vegan,...
    let mealFilters = message.evaluatedMessage.filter
    // without a date, we can't fetch any meals
    if (dateOfMessage === undefined || dateOfMessage === '') {
        let answerText =
            'Sorry, ich konnte leider kein Datum feststellen. Gib bitte ein Datum an für das du den Mensaplan haben willst.'
        message.answer = { content: answerText, history: 'MensaService' }
        res.send(message)
    } else {
        // if mealFilters isn't already a array, we make one out of it
        if (!Array.isArray(mealFilters)) {
            mealFilters = [mealFilters]
        } else if (mealFilters === undefined) {
            // if we don't have any filters, we create an empty array
            mealFilters = ['']
        } else {
            // fetch the meals and filter them
            let meals = await mealsOfSpecificDayService.filterMeals(
                mealFilters,
                dateOfMessage
            )
            // generate an answer out of the filtered meals
            let answerText = await generatedMessage.generateSpecificDayAnswer(
                meals
            )
            // extend the message object, with an answer-attribute containing the response and a
            // history-property, which can be extended by the other services for debugging purposes.
            message.answer = { content: answerText, history: 'MensaService' }
            res.send(message)
        }
    }
})
// export everything
module.exports = router
