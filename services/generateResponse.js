module.exports = {
    /**
     * @method generateSpecificDayAnswer generates and returns an async answer based on an array that stores the meals of a specific day
     * @param meals an array with meals of a specific day
     */
    generateSpecificDayAnswer: async meals => {
        // empty message text that has to be filled and parsed
        let messageText = ''

        // if the date is on a day where the mensa is closed, fill messageText accordingly and return it
        if (meals.length === 2) {
            messageText = 'Die Mensa hat an Wochenende nicht geöffnet!'
            return messageText
        } else {
            /**
             * @param meal a meal from the array of meals that is used to fill the message
             * by providing all the necessary informations like name, prices, etc.
             */
            messageText = 'Hey, heute gibts folgendes zum futtern: \n\n'
            JSON.parse(meals).forEach(meal => {
                messageText +=
                    '\n' +
                    meal.name +
                    '\n' +
                    'Prices: \n' +
                    'Students: ' +
                    meal.prices.students +
                    ' Employees: ' +
                    meal.prices.employees +
                    ' Andere: ' +
                    meal.prices.others +
                    '\n' +
                    'Inhaltsstoffe: '
                meal.notes.forEach(note => {
                    messageText += note + ', '
                })
                messageText =
                    messageText.substring(0, messageText.length - 2) + '\n'
            })
            // return the filled message that inherits all the meal information of a specific day
            return messageText
        }
    }
}
