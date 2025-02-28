# Care Nest  - Backend

This repository contains the back-end code for Care Nest project,
which focuses on providing an API and business logic for the application that supporting new mothers in understanding the needs of their newborns.
The app uses advanced technology to analyze the baby's crying, ensuring that his needs are always met.
In addition to monitoring the daily health and development of the baby on a weekly basis, the app provides entertainment and educational features. 
It also includes comprehensive medical support, social communication, psychological support, and many valuable features to help mothers care for their children effectively..

## Table of Contents

- [Care Nest  - Backend](#care-nest----backend)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Tech Stack](#tech-stack)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Running the Server](#running-the-server)
  - [API Documentation](#api-documentation)
        - [User Routes](#user-routes)
        - [Baby Routes](#baby-routes)
  - [Environment Variables](#environment-variables)
  - [Folder Structure](#folder-structure)
  - [Contributing](#contributing)

## Project Overview

The back-end of this application provides RESTful APIs to manage users, products, and more. The APIs serve the front-end, enabling users to register, log in, create new baby, and manage their need.

The project aims to provide a platform for women to understood thair new born baby .

## Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing data
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication using JSON Web Tokens

## Features

- User registration, login, and authentication
- CRUD operations for user
- Role-based access control (admin and user)
- Secure API using JWT authentication

## Getting Started

To get started with the back-end branch, follow the instructions below.

### Prerequisites

- **Node.js** (v14 or above)
- **npm** or **yarn** for package management
- **MongoDB** (local or cloud database like MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   https://github.com/Advanced-Infant-Care-Technology/Backend.git
   ```
2. Navigate to the backend directory:
    ```bash
    cd Advanced-Infant-Care-Technology/backend
    ```
3. Install the dependencies:
   ```bash
        npm install
   ```

## Running the Server

1. Create a .env file in the backend directory based on the provided .env.example file. Update the necessary environment variables.

2. Start the development server:
   ```bash
        npm run dev
   ```
   The server will start on http://localhost:5000.

## API Documentation

Below are some of the available API endpoints. For complete documentation, refer to the docs folder or access the Swagger documentation if it's available.

##### User Routes

 - User Registration (Sign up)
        Method: POST
        Route: /auth/signup
        Description: Registers a new user.
        Body:
      ```json
             {
               "firstName":"",
               "lastName":"",
               "Email": "user1@example.com",
               "password":"Password123@",
               "passwordConfirm": "Password123@",
               "dateOfBirthOfMam":"yyyy-mm-dd"
    }
      ```
- ---------
- Verify Email of User
        Method: POST
        Route: /auth/verifyEmailUser
        Description: verifies the email of new user to make sure this is valid email.
        Body:
   ```json
      {
      "code":""
      }
   ```
- ---------

- User Login
        Method: POST
        Route: /auth/login
        Description: Logs in an existing user and returns a token.
        Body:
   ``` json
            {
            "Email": "user1@example.com",
            "password":"password123"
            }
   ```
- ---------
- Forget password
      Method: POST
        Route: /auth/forgetpass
        Description: if the user forget password and want to login .
        Body:
   ``` json
            {
            "Email": "user1@example.com",
            }
   ```
- ---------
- verify password
  
        Method: POST
        Route: /auth/verifycode
        Description: verifycode of the forget password that sent to email.
        Body:
   ``` json
            {
             "resetCode":"508840"
            }
   ```
- ---------
- Reset password 
  Method: PUT
        Route: /auth/resetpassword
        Description: make a new password 
        Body:
   ``` json
      {
            "newPassword":"Usernewpassword123@",
            "passwordConfirm":"Usernewpassword123@"
      }
   ```
- ----------
##### Baby Routes

- Add new baby
        Method: POST
        Route: /babies/
        Description: Add new baby to logged user (mother)
        Body:
   ```json
       {
            "name":"marawan",
            "weight":10,
            "height":50,
            "dateOfBirthOfBaby":"2023-11-22",
            "gender":"Male"
      }
   ```
- ---------
- Get baby informatio with id 
        Method: GET
        Route: /babies/:id
        Description: Get baby informatio with id and he/she is baby of logged user
- ---------
- Get all babies of logged user
        Method: GET
        Route: /babies/allBabiesOfLoggedUser
        Description: Get all babies of logged user 

- ----------

- get all babies in database
         Method: GET
         Route: /babies/all
         Description: Get all babies i the database ( allowed only for admin)
- ---------
- Update baby informatio with id 
         Method: PUT
         Route: /babies/:id
         Description: Get all babies i the database ( allowed only for admin)

- --------

- Delete baby informatio with id 
         Method: DELETE
         Route: /babies/:id
         Description: Delete baby 

- --------


## Environment Variables
Create a .env file in the root of your project and provide the following variables:

```env
PORT=8000
NODE_ENV=development
BASE_URL=http://localhost:8000

# Database
DB_URI=
DB_PASSWORD=
DB_USER=
DB_NAME=

# hash secret password
HASH_PASS = 
#jwt
JWT_SECRET_KEY=
JWT_EXPIRE_TIME=90d


#Email Settings
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=
EMAIL_PASSWORD=
```

## Folder Structure

## Contributing

If you would like to contribute to the project, please create a pull request with detailed information on your changes. Feel free to open issues if you find bugs or want to request new features.