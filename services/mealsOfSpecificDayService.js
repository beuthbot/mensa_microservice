const axios = require('axios')

/*
 * @param {Array} mealsOfSpecificDay List of objects to filter
 * @param {Array} Array of note strings
 */
let filterMeals = async (mealFilters, date) => {
    try {
        let mealsOfSpecificDay = await axios.get(
            `https://openmensa.org/api/v2/canteens/49/days/${date}/meals/`
        )

        console.log(mealsOfSpecificDay.data)
        let filteredMeals = new Set([])
        let containsAllFilters = false
        mealsOfSpecificDay.data.forEach(meal => {
            for (i in mealFilters) {
                if (meal.notes.some(note => note.includes(mealFilters[i]))) {
                    //containsFilter(meal, mealFilters[i])) {
                    containsAllFilters = true
                } else {
                    containsAllFilters = false
                    break
                }
            } //for
            if (containsAllFilters) {
                filteredMeals.add(meal)
            }
        }) //mealsOfSpecificDay.forEach()
        console.log(JSON.stringify(Array.from(filteredMeals)))
        return JSON.stringify(Array.from(filteredMeals))
    } catch (error) {
        console.log(error)
    }
} //filterMeals

module.exports = { filterMeals } //Module Exports
