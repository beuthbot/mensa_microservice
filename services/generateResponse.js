const mealsOfTheDay = require('../data/mealsOfTheDay.json')
const answer = require('../data/answer.json')
const fileSystem = require('fs')

module.exports = {
    // generate an answer with the meal of the day
    // generateAnswer: () => {
    //     let messageText = 'Hey, heute gibts folgendes zum futtern: \n\n'
    //     mealsOfTheDay.forEach(meal => {
    //         messageText +=
    //             '\n' +
    //             meal.name +
    //             '\n' +
    //             'Prices: \n' +
    //             'Students: ' +
    //             meal.prices.students +
    //             ' Employees: ' +
    //             meal.prices.employees +
    //             ' Andere: ' +
    //             meal.prices.others +
    //             '\n' +
    //             'Inhaltsstoffe: '
    //         meal.notes.forEach(note => {
    //             messageText += note + ', '
    //         })
    //         messageText =
    //             messageText.substring(0, messageText.length - 2) + '\n'
    //     })

    //     answer.content = messageText

    //     fileSystem.writeFile(
    //         'data/answer.json',
    //         JSON.stringify(answer),
    //         err => {
    //             if (err) {
    //                 console.log('Error writing file!', err)
    //             } else {
    //                 console.log('Writing file was successfull')
    //             }
    //         }
    //     )
    // },

    // generate an answer with meals of a specific day and filters
    generateSpecificDayAnswer: async meals => {
        let messageText = ''

        if (meals.length === 2) {
            messageText = 'Die Mensa hat an Wochenende nicht geöffnet!'
            return messageText
        } else {
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
            return messageText
        }
    }
}
