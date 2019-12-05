# A Mensa Microservice for our Chatbot  <!-- omit in toc -->

## Table of Contents <!-- omit in toc -->

- [Description](#description)
- [Structure](#structure)
- [Deployment](#deployment)
- [The scripts- and data-folder](#the-scripts--and-data-folder)
- [The services-folder](#the-services-folder)
  - [generateResponse.js](#generateresponsejs)
  - [mealService.js](#mealservicejs)
  - [mealsOfSpecificDayService.js](#mealsofspecificdayservicejs)
- [The routes-folder](#the-routes-folder)

## Description

This microservice makes calls to the [OpenMensa API](https://doc.openmensa.org/api/v2/). The data is then processed by services that give a list of filtered and unfiltered meals of a specific meal plan of the Beuth University for Applied Sciences. Mainly this service was built throughout the Masterprojekt module that is a mandatory part of the media informatics master course of the Beuth University for Applied Sciences. This service has been written by two pretty cool dudes (shoutout to Stevie and Tolga, and yes, it is us who wrote this).

For the realization of this service, Tolga and Stevie used express.js to make HTTP calls and process them.

## Structure

The microservice consists of four folders containing several scripts, which are designated to perform certain tasks. We have the *scripts*-folder containing scripts, that will be called by cron-jobs mainly for caching purposes. Then we have the *services*-folder containing files, that consist of functions useful to process incoming requests from the chatbot and to generate a formatted answer-string, that contains the requested meal-menu of a specific day from the Beuth mensa. The *routes*-folder consists of all the routes, that can be addressed. Lastly the *data*-folder contains files, that are needed for caching pregenerated answers and the meals for the current day. In the next chapters we will get into more details about the scripts and their functions.

## Deployment

First of all, clone this project so that you have a copy of it on your system.

For cloning via ssh: `git clone git@github.com:Onkilchen/mensa_microservice.git`
For cloning via https: `https://github.com/Onkilchen/mensa_microservice.git`

In order to work with this service locally, you will need to make sure that you have node and npm installed on your working system. To check if you already have node installed, try

`node --version`

Same for checking if npm is installed, just with npm instead of the node command

`npm --version`

If you don't have node or npm installed, search for the way to properly install it for your OS by searching for it on your preferred search engine such as duckduckgo.com :duck:

After you cloned the project, `cd` into it and install all necessesary dependencies

`npm install`

Now you can start the local development server to play around with the API and make your calls

`npm run dev`

This will fire up a development server that listens on port 8000.

If you direct your browser to http://localhost:8000/meals, you will get a list of the meal plan of the actual day for the mensa at the Beuth University for Applied Sciences.

## The scripts- and data-folder

This folder contains two scripts, that will be called by a cron job once a day. Probably early in the morning. *getMealsOfTheDay.js* makes a request to the [OpenMensa API](https://doc.openmensa.org/api/v2/) and caches the answer in a file called *mealsOfTheDay.json*. After that *writeResponseFile.json* is called and generates a pretty formatted answer-string out of the *mealsOfTheDay*-object and stores it in *answer.json*. Now everytime a User wants to know the meals for the day, we can just read it out of those files.

## The services-folder

This folder consists of several services, that perform specific tasks for the microservice.

### generateResponse.js

Creates a nicely formatted string from a mensa-JSON-object and stores it in a file.

### mealService.js

Makes a request to the OpenMensa-API and stores the response in a file. It can also filter the file for specific meals. For example only vegetarian or vegan meals, etc.

### mealsOfSpecificDayService.js

If a day other than the current day is requested, we need to make another request to the OpenMensa-API, fetch the meals for that specific day and maybe need to filter them. This is all done by this script.

## The routes-folder

This folder contains all the routes, that can be addressed on this server. The *index.js* manages all the routes. We've only got two routes in our project. The */swagger*-route leads you to the swagger documentation of this project. The */meals*-route will be called by another component. It expects a message object containing the requested date for the meals and the filters - to request only specific meals. It then calls all the functions needed to perform requests and generates an answer, which is finally send back as a response to the Chatbot.

