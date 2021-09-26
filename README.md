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

#### 4 - Instalar dependências   
`yarn` 

#### 5 - Instalar [Postgres](https://computingforgeeks.com/installing-postgresql-database-server-on-ubuntu/) 

```
  sudo apt -y upgrade
  sudo apt install postgresql postgresql-client
  systemctl status postgresql.service 

  sudo su - postgres
  psql -c "alter user postgres with password 'password'"
  createdb libraske
```

#### 6 - Instalar [RabbitMQ](https://www.vultr.com/docs/install-rabbitmq-server-ubuntu-20-04-lts)
```
sudo apt-get install wget apt-transport-https -y
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -
echo "deb https://dl.bintray.com/rabbitmq-erlang/debian focal erlang-22.x" | sudo tee /etc/apt/sources.list.d/rabbitmq.list
sudo apt-get install rabbitmq-server -y --fix-missing
sudo systemctl status rabbitmq-server
sudo rabbitmq-plugins enable rabbitmq_management
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
