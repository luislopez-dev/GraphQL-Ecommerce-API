# Ecommerce GraphQL API

![alt text](https://918429.smushcdn.com/2325059/wp-content/uploads/2020/05/comercio-online-mcommerce.jpg)

## Table of contents

* [Introduction](#introduction)
* [Run](#run)
* [Technology](#technology)
* [Database model](#database-model)
* [Mutations](#mutations)
* [Queries](#queries)
* [Licence](#licence)

## Introduction

Ecommerce GraphQL API to implement with any fronted platform. 

## Run

To run this application, you have to set your own environmental variables. For security reasons, some variables have been hidden from view and used as environmental variables with the help of dotenv package. Below are the variables that you need to set in order to run the application:

* MONGO_URI=  This is the connection string of your MongoDB Atlas database.

* PORT=  This is the port number for running the Node.js server. 

* SET_GRAPHIQL= Boolean variable for enabling GraphiQL IDE.

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

## Mutations

### createUser()

### createProduct()

### updateProduct()

### deleteProduct()

## Queries

### login()

### products()

### product()

## Licence
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

* MIT License
* Copyright 2021 © Luis Lopez
