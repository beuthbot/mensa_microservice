const mealsOfTheDay = require('../data/mealsOfTheDay.json')
const axios = require('axios')
const fileSystem = require('fs')
const date = new Date()

module.exports = {
    getMealsOfTheDay: async () => {
        try {
            const response = await axios.get(
                `https://openmensa.org/api/v2/canteens/49/days/${date}/meals/`
            )
            // console.log(response.data)

            await fileSystem.writeFile(
                'data/mealsOfTheDay.json',
                JSON.stringify(response.data),
                err => {
                    if (err) {
                        console.log('Error writing file!', err)
                    } else {
                        console.log('Writing file was successfull')
                    }
                }
            )
        } catch (err) {
            console.log(err)
        }
    }
}
