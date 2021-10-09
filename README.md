# Ecommerce GraphQL API

![alt text](https://microprofile.io/wp-content/uploads/2019/01/GraphQL-Logo.png)

## Table of contents

* [Introduction](#introduction)
* [Technology](#technology)
* [Database model](#database-model)
* [Installation](#installation)
* [Run](#run)
* [Mutations](#mutations)
* [Queries](#queries)
* [Licence](#licence)

## Introduction

Ecommerce GraphQL API to implement with any fronted platform. 

## Technology

* Node.js
* GraphQL
* Express
* MongoDB
* Mongoose

## Database model

All the models can be found in the models directory created using mongoose.

### Product Schema:

* name (String)

* price (Number)

* description (String)

* ammount (Number)

* imgURL (String)

### User Schema:

* name  (String)

* email (String)

* password (String)

## Installation

1. Clone this repository  `git clone https://github.com/Luis-Rene-Lopez/Ecommerce-REST-API`

2. Go to the project `cd Ecommerce-REST-API`

3. Install the project dependencies `npm install`

## Run

To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

* MONGO_URI=  This is the connection string of your MongoDB Atlas database.

* PORT=  This is the port number for running the Node.js server. 

* SET_GRAPHIQL= Boolean variable for enabling GraphiQL IDE.

You can start the API server by running `npm start`

## Mutations

All the mutations can be found in the GraphQL schema file

## Queries

All the queries can be found in the GraphQL schema file

## Licence
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

* MIT License
* Copyright 2021 © Luis Lopez
