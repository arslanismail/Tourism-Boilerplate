# Tourism Project BackEnd


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

# Authror
##### Email : arslanismail840@gmail.com
##### Name : Arslan Ismail

#
#
Project is a boilerplate for backend services of tourism web app , here lies the skeleton or the Architechture of the project all the backend services will be built over this project.

## Project Architechture

  - We are using express as a framework but we modify the project stucture according to our needs  , we are using  MVC along with service Layer
  - Folder Stucture is as Follow
    - Src - api - v1 App(Bussiness Logic )
      - Models
      - Controller
      - Services
      - Routes
      - Validations
      -
    - Src - Config (Project Configurations DB Setup| Middlewares | Envioronment Goes here)
    - Src - docs (Api Documentation will go here we will use swagger for Api documentation)
    - Src - util (All External Services goes here e.g JWT, GoogleMaps etc)

### Project Lifecycle
  - Application | Server bootup from src folder "server.ts | server.js(in production)" which runs the imported code from "app.ts" it loads up all the needed packages that are essential for the app to work

    - Config
      - Config folder handles all the envioronment related stuff like node-env
      - Database connection file
      - Any Thirld Party Integration etc
    - Routes
      - From "App.js" All the requests are mapped to "Api/ index.ts"
      - "Api/v1 index.ts" load routes files by calling ApiV1Routes
      - ApiV1Routes is reference to this file  "Api/v1 index.ts" that holds all of our route files
    - Validation | Middleware | controllers
       - validation function  and controllers respective methods are called against each route the respective method will recieve request,response and callback method(next)
    - Controller
      - Once in Controller function , it will call respective serice where all the bussiness logic is handeled, to interact with db services call the respective Models
    - Models (Models are the Layer that interact with DB)


### Third Party Packages

 * "@hapi/joi": "^17.1.1",
 *   "axios": "^0.19.2",
 *   "body-parser": "^1.19.0",
 *   "crypto-js": "^4.0.0",
 *   "dotenv": "^8.2.0",
 *   "express": "^4.17.1",
 *   "joi-phone-number": "^4.1.0",
 *   "jsonwebtoken": "^8.5.1",
 *   "knex": "^0.20.13",
 *   "mssql": "^6.2.0",
 *   "supertest": "^4.0.2",
 *   "swagger-jsdoc": "^4.0.0",
 *   "winston": "^3.2.1"


### Installation

#### Tourism.API
Requires Node version 12 or above and Npm version to be 6 and above

Install the dependencies and devDependencies and start the server.

```sh
$ cd/{$ROOT_DIERECTORY}
$ npm install -d
$ npm run dev
```

For production environments...

```sh
$ npm install --production
$ NODE_ENV=production node app
$ npm run build
```


# Security Practices We are Using:
  *  ##### Token Verification Validation
  *  ##### Request Object Encryption



