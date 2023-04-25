<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
</p>

## Description

Computech is an online Technology Store Backend where you can manage products, orders, costumers, coupons and related resources. 

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Environment Variables

Copy ```.env.template``` to ```.env```

And fill the correct values within **.env**.

```bash
# Terminal
$ cp .env.template .env
```

## Docker

Load Docker Image

```bash
# Terminal
$ docker-compose up -d
```

## Node

__You can generate your JWT_SECRET with NODE__

```bash
# Enter to NODE REPL
$ node

# Execute this line
$ require('crypto').randomBytes(64).toString('hex');
```

__Copy generated secret and paste it into environment variables__

```.env```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
