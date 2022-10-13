# challenge-api
This project was developed to apply my knowledge after studying NestJs. In it I use a notifications approach via WebSocket. The idea of the project is to allow the user to create their teams, as well as search and create matches for them, thus defining the time and place where they will take place. For reasons of time this project was limited to creating teams and scheduling games, thus allowing the creation of new features in the future, such as adding players to the team. The project needs to run along with the [Front-end](https://github.com/viniciusschneider/challenge-portal).

## Environment
Configure the following file with your database connection `src\environments\environment.ts`

## Login
To log into the application we have two users
> email: admin@admin.com
> password: 12345678

> email: player@player.com
> password: 12345678

## Front-end project
```
https://github.com/viniciusschneider/challenge-portal
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
