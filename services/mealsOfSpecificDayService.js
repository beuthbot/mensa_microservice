//we use axios to make a request to the openmensa-API
const axios = require('axios')

module.exports = {
    /**
     * @method filterMeals makes a get-request to the openmensa-API and filters the received JSON-Object
     * for the given filters
     * @param mealFilters List of items, after which to filter the meals. E.g. vegetarian, vegan,...
     * @param date the date, for which we should fetch the meals. Format: yyyy-mm-dd or dd-mm-yyyy
     */
    filterMeals: async (mealFilters, date) => {
        try {
            let mealsOfSpecificDay = await axios.get(
                `https://openmensa.org/api/v2/canteens/49/days/${date}/meals/`
            )
            //we use a set, because it only holds unique values and don't get a meal twice
            let filteredMeals = new Set([])
            //boolean required for filtering
            let containsAllFilters = false
            //loop over each meal...
            mealsOfSpecificDay.data.forEach(meal => {
                //...and for each meal, loop over the filter words
                for (i in mealFilters) {
                    if (
                        //check if notes array contains a filter word
                        meal.notes.some(note => note.includes(mealFilters[i]))
                    ) {
                        //if so, set the boolean to true
                        containsAllFilters = true
                    } else {
                        //if not, set boolean to false and get out of the loop, because then we don't need that meal
                        //in our response
                        containsAllFilters = false
                        break
                    }
                } //for
                if (containsAllFilters) {
                    //if a meal contains all filters, add it to the set
                    filteredMeals.add(meal)
                }
            })
            //cast the set to an array and return it
            return JSON.stringify(Array.from(filteredMeals))
        } catch (error) {
            console.log(error)
        }
    }
}
