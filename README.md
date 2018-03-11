# HelloBooks
[![Coverage Status](https://coveralls.io/repos/github/zachang/HelloBooks/badge.svg?branch=devmain)](https://coveralls.io/github/zachang/HelloBooks?branch=devmain)
[![Build Status](https://travis-ci.org/zachang/HelloBooks.svg?branch=devmain)](https://travis-ci.org/zachang/HelloBooks?branch=devmain)
[![Maintainability](https://api.codeclimate.com/v1/badges/43a7311972462488133e/maintainability)](https://codeclimate.com/github/zachang/HelloBooks/maintainability)

**HelloBooks** is a web app that leverages on modern technology and aims to ease, manage and automate the way libraries and its members interact. In terms of member registration, borrowing, returning etc.

## What Users can do on the app

* Users can sign up for the app
* Users can login to gain access to all features of the app
* Users can can borrow books on the app
* Users can return books on the app
* Users can view all their borrow history on the app.

## Technology Stack
* NodeJS
* Sequelize ORM
* Postgres relational database
* Materialzecss
* React
* Redux

## How to install this project

-   Install Node, Expressjs and Postgres on your machine
-   Clone the repository `https://github.com/zachang/HelloBooks.git`
-   Change directory on commanline `$ cd /HelloBooks`
-   Install all required dependencies with `$ npm install`
-   Create a `.env` file in your root directory and .env sample guide below to create environment variables
-   Run this command `sequelize db:migrate`to migrate your database
-   Undo migrations with this command `sequelize db:migrate:undo`.
-   Run `npm start:dev` to start the server
-   Run `npm build:dev` to start the client

>   .env sample file
``` SECRET_TOKEN
    DB_NAME
    PASSWORD
    TEST_DB_PASSWORD
    DB_USER
    ADMIN_NAME
    ADMIN_USERNAME
    ADMIN_EMAIL
    ADMIN_PHONE
    ADMIN_PASSWORD
    ADMIN_STATUS
    ADMIN_LEVEL
    TEST_DB_NAME
    API_HOST
    USER_EMAIL
    USER_EMAIL_PASSWORD
    CLIENT_ID
```
   
## Testing
-   Run Test `npm testdev`

-   `Use different DB's for testing and development`

##  Project Limitations
  * Users can only sign-up once with their username, email, full name, mobile number  and password.
  * Users can login and obtain a token if authenticated.
  * When logged in, users can view all books .
  * When logged in, users can borrow books.
  * When logged in, users can view borrow history of books borrowed.
  * When logged in, users can return books borrowed.
  * When logged in, only users that are admins can add books.
  * When logged in, only users that are admins can modify book details.
  * Protected routes can only be accessed with verified tokens.
  * Invalid routes are rejected

  # LINK to API
  * You can Access API at [https://zachang-hellobooks.herokuapp.com/api/doc/]
  # LINK to SITE
  * You can Access API at [https://zachang-hellobooks.herokuapp.com]
  
  # Want to Contribute?
  * Fork the repository
  * Add contributions
  * Create Pull request 
