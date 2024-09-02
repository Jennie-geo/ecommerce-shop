## Project Overview

This is a simple e-commerce system that allows unauthenticated users to view approved products, authenticated users to manage their products, and an admin to manage users and products. This project was done using Nestjs framework, postgres database, swagger for Api documentation, Typeorm.

## Key Features

User and Admin account creation

### User/Person Features

    User logs in
    User create a product, which by default will be set to pending
    User can update a product that he/she created
    User can delete a product
    User can see all the product that they created whether approved or not

### Admin Features

    Admin logs in
    Admin can get all products
    Admin can approve or disapproved a product
    Admin can get all users
    Admin can ban and unban a user

### Product Features

    Unauthenticated user can see all approved products, but can't create a product
    A banned user can not login to the system

## Project setup

The source code of the project is on Github:

```bash
$ https://github.com/Jennie-geo/ecommerce-shop
```

```bash
$ npm install
```

```bash
$ npm run migration:run
```

## Compile and run the project

Connect to the db using the .env.example db data

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
## Visit the Api documentation on Swagger

```bash
$ http://localhost:3001/api#/
```

