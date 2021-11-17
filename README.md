# Libraskê api
> Esse microserviço serve para prover dados para o player do libraskê.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

![vlibras-image]

<hr>

## Table of Contents

- [Installation](#installation)
- [Running API](#running-api)
- [Running Tests](#running-tests)
- [Release History](#release-history)
- [Contributors](#contributors)
- [License](#license)


<hr>

## Architecture Libraskê

![](/doc/img/model.png)

<hr>

## Installation 

#### 1 - Clone the repository  
`git clone https://gitlab.lavid.ufpb.br/vlibras2019/librask-2021/libraske-api.git`

#### 2 - Install [NodeJs](https://nodejs.org/en/)  

#### Install [Yarn](https://yarnpkg.com/)

* 

`npm install -g yarn`  

#### 4 - Install dependencies
`yarn` 


#### 5 - PostgreSQL with Docker

```
docker run -d --name libraske-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432  postgres
docker start libraske-postgres
```

#### 6 - RabbitMQ with Docker

```
docker run -d -p 15672:15672 -p 5672:5672 --name rabbitmq rabbitmq:3-management
docker start rabbitmq
```

#### 7 - Execute migrations

`yarn typeorm migration:run`

#### 8 - Execute database seed

`yarn seed`

<hr>

## Running API

`yarn dev`

<hr>

## Running Tests

```sh
yarn test --silent
```

<hr>

## Release History

0.0.0 - Initial version

<hr>

## Contributors

João Vinícius – joaovinicius@lavid.ufpb.br

<hr>

## License


<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
[vlibras-image]: https://www.gov.br/governodigital/pt-br/vlibras/vlibras/@@govbr.institucional.banner/e070e146-e2bd-4754-8c55-36100391d1a6/@@images/f77e1435-97aa-4c8e-9f9f-6a42cc82f39a.png
