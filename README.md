# Technical Test NodeJs Kadievka 👩‍💻

☕️ Developed by **Kadievka Salcedo** 💻

In this project you will found:
- API Documentation:

  - **Route:** GET http://localhost:4000/api-docs **Description:** swagger implementation.

- Users Services:
  - **Route:** POST http://localhost:4000/user **Description:** it registers a new user with email and password.
  - **Route:** POST http://localhost:4000/user/login **Description:** login route to get a json web token to use other endpoints.

- Countries Services:
  - **Route:** GET http://localhost:4000/countries **Description:** Get all countries.
  - **Route:** POST http://localhost:4000/countries/create **Description:** Create one country.
  - **Route:** GET http://localhost:4000/countries/{isoCode} **Description:** Get one country by isoCode.
  - **Route:** PUT http://localhost:4000/countries/update/{isoCode} **Description:** Update one country by isoCode.
  - **Route:** DELETE http://localhost:4000/countries/delete/{isoCode} **Description:** Delete one country by isoCode.

- Markets Services:
  - **Route:** GET http://localhost:4000/markets **Description:** Get all markets.
  - **Route:** POST http://localhost:4000/markets/create **Description:** Create one market.
  - **Route:** GET http://localhost:4000/markets/{marketCode} **Description:** Get one market by marketCode.
  - **Route:** PUT http://localhost:4000/markets/update/{marketCode} **Description:** Update one market by marketCode.
  - **Route:** DELETE http://localhost:4000/markets/delete/{marketCode} **Description:** Delete one market by marketCode.

- Transactions Services:
  - **Route:** GET http://localhost:4000/transactions/summary **Description:** Get all transactions and filter by options: dateFrom, dateTo, marketCode, countryIsoCode.
  - **Route:** GET http://localhost:4000/transactions **Description:** Get all transactions.
  - **Route:** POST http://localhost:4000/transactions/create **Description:** Create one transaction.
  - **Route:** GET http://localhost:4000/transactions/{_id} **Description:** Get one transaction by _id.
  - **Route:** PUT http://localhost:4000/transactions/update/{_id} **Description:** Update one transaction by _id.
  - **Route:** DELETE http://localhost:4000/transactions/delete/{_id} **Description:** Delete one transaction by _id.

**Every route, except documentation, register and login, uses JWT Bearer authentication.**

------------

## Install dependencies

Download the project, and run `npm install`.

## Configure .env variables

In the **.env.example** file you can see which variables are needed to run the project.

## Run the serve

Run `npm run dev`, it will start the server has development mode.

