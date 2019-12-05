const mealsOfTheDay = require('../data/mealsOfTheDay.json')
const answer = require('../data/answer.json')
const fileSystem = require('fs')

module.exports = {
    generateAnswer: () => {
        let messageText = 'Hey, heute gibts folgendes zum futtern: \n'
        mealsOfTheDay.forEach(meal => {
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
                messageText.substring(0, messageText.length - 2) + '\n\n'
        })

        answer.content = messageText

        fileSystem.writeFile(
            'data/answer.json',
            JSON.stringify(answer),
            err => {
                if (err) {
                    console.log('Error writing file!', err)
                } else {
                    console.log('Writing file was successfull')
                }
            }
        )
    }
}
