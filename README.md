
# Task-Manager API


## Tech Stack


**Server:** Node, Express.js , MongoDB, ElasticSearch, 


## Features

 Authentication :-
Secure JWT-based Login & Signup system for user authentication.

 Task Management :-
Users can Create, Edit, and View tasks seamlessly.

 RESTful API :- 
Built using Express.js, providing clean and scalable API endpoints.

Filter And Sorting :
Filters: Tasks can be filtered by priority, status, and deadline.
Sorting: Tasks can be sorted according to priority, due-date, or status.


Backend (Express + Mongoose)

MongoDB-Elasticsearch database

Robust data management with MongoDB and Elasticsearch.

 Modular Codebase :-
Organized project structure for maintainability and scalability.

 
## Backend Apis

Swagger Api Docs - [/api-docs](http://localhost:2255/api-docs/) (when the backend is running)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### Server side env

`PORT`

`HOST_URL` - 
####eg: http://localhost:2255

`JWT_SECRET`

`DB_URL`

`NODEMAILER_AUTH_EMAIL`

`NODEMAILER_AUTH_PASS`

`ES_URL` 
####elasticsearch URL

## Run Locally

Clone the project

```bash
  git clone (https://github.com/Bitcot-task-manager-api.git)
```

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```







