# NodeJS-GMP Homework repository

## Homework 5:
Before start: create at root folder `.env` file with DATABASE_URI variable

To create mock data: add `IS_INITIAL_START = true` to the `.env`

To run: `npm run start`

Logs placed at `logs/app.log`

### Evaluation criteria:

* 2.Custom logger based on console.log is added instead of Loggerpackage.
   **Achieved by using Morgan Logger package**
* 3.Task 5.1 is fulfilled to the full extent; logs are written into the console.
   **Achieved by using Morgan Logger package**
* 4.Task 5.2 is fulfilled to the full extent; Winston(https://github.com/winstonjs/winston)package is used for logging.
   **Achieved by using Morgan and Winston libraries**
* 5.Task 5.3 is fulfilled to the full extent.
   **Achieved by using Morgan, Winston packages and custom helpers**
* 5*.Add middleware wrapper functions (or decorators) which will track the methods’ execution time.
   **Achieved by using Morgan Logger package which logs response-time: elapsed time from when a request enters this middleware to when the headers are written out to the client**
