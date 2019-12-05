const axios = require('axios')

const date = new Date()

module.exports = {
    /*
     * @param {Array} mealsOfSpecificDay List of objects to filter
     * @param {Array} Array of note strings
     */
    filterMeals: async (mealsOfSpecificDay, notes = ['vegan']) => {
        mealsOfSpecificDay = await axios.get(
            `https://openmensa.org/api/v2/canteens/49/days/${date}/meals/`
        )
        let filteredMeals = new Set([])
        mealsOfSpecificDay.data.forEach(meal => {
            for (i in notes) {
                if (isContains(mealsOfSpecificDay, notes[i])) {
                    filteredMeals.add(meal)
                } else {
                    if (filteredMeals.contains(meal)) {
                        filteredMeals.delete(meal)
                        break
                    }
                }
            } //for
        }) //mealsOfSpecificDay.forEach()
        console.log(filteredMeals)
    }, //filterMeals

    isContains: (meal, value) => {
        let contains = false
        Object.keys(meal).some(key => {
            contains =
                typeof meal[key] === 'object'
                    ? _isContains(meal[key], value)
                    : meal[key] === value
            return contains
        })
        return contains
    } //_isContains
} //Module Exports

//     console.log(
//         'Meals: ' + JSON.stringify(mealsOfSpecificDay.data[0].notes)
//     )
//     // console.log('Notes: ' + JSON.stringify(mealsOfSpecificDay[notes]))
//     // if there is nothing selected, return all objects
//     if (notes.length <= 0) {
//         return mealsOfSpecificDay.data.map(object => {
//             return object
//         })
//     }
//     //  Otherwise filter on the given note or notes
//     let filteredObjects = mealsOfSpecificDay.data.map(
//         (object, index, objects) => {
//             // Check if this object matches the provided filter
//             let filteredObject =
//                 object ===
//                 object.notes.some(objectNote => filterNotes(objectNote))
//             object = filteredObject
//             return object
//         }
//     )
//     console.log(filteredObjects)
//     return filteredObjects
// },
// // check if note is in object note
// filterNotes: objectNote => {
//     return notes.some(filteredNote => filteredNote === objectNote)
// }
