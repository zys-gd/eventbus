[NESTJS-LINK]: https://nestjs.com/
[NODEJS-LINK]: https://nodejs.org/uk/
[DOCKER-LINK]: https://docs.docker.com/install/
[DOCKERCOMPOSE-LINK]: https://docs.docker.com/compose/install/
[POSTMAN_COLLECTION]: https://www.getpostman.com/collections/8f60b3d23a157b68c50c
# Eventbus

## Description

Based on [NODEJS][NODEJS-LINK] and [NESTJS][NESTJS-LINK] framework

## How to install

### Requirements

#### Windows

0. Windows 10 version **2004** or higher
1. Enabled **WSL2**
2. Installed **Docker Desktop** 19.03.0+  with enabled WSL2 containers
3. Installed **Ubuntu** for Windows 10

Go to Ubuntu and clone project **inside** it.

#### Linux

* Install [docker][DOCKER-LINK] (19.03.12+) / [docker-compose][DOCKERCOMPOSE-LINK] (v1.26.2+).
* To use docker-container without switching to superuser mode, you need to add a group for the current system user: `sudo usermod -aG docker $USER`. Otherwise, you will have to run all the docker commands through the `sudo` command


## Running the app
Firstly, you need to copy `docker-compose.override.dist.yml` to `docker-compose.override.yml`.
Secondly, you are supposed to make here own customisation and optimisation docker under your system and environments (e.g. set network settings).
Thirdly, copy `.env.dist` to `.env` and modify it. 

Application start automatically with docker containers. You can start it manually as well with commands (see package.json):
```bash
# development
$ npm run start:consumer:dev
$ npm run start:api:dev
```

## Requests signature
Each request must be signed by hash. There are two types of hash creating:
1. If request has a body, bcrypt concatenation's result of body and secret
    ```
    bcrypt.hashSync('{"eventType":"test_type","data":{"123":"test data string"}}' + 'secret', 10);
    ```
2. If request hasn't body, bcrypt concatenation's result of apiKey and secret
    ```
    bcrypt.hashSync('apiKey123' + 'secret321', 10);
    ```
You should get hash (e.g `$2a$10$F5/5yJUExWBSgDA6zKNdIOthL2yAEpHiMatocu2kolzUEiUG.shBu`) and pass it to requirement header `hash`
## Test
For testing endpoints use this [requests][POSTMAN_COLLECTION] as example.

Run automation tests:
```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
## Configuration

### Environment variables

- `ENTRYPOINT_API` _(string)_ command for running API application
- `ENTRYPOINT_CONSUMER` _(string)_ command for running consumer application
- `MYSQL_ROOT_PASSWORD` _(string)_ mysql root password
- `MYSQL_DATABASE` _(string)_ mysql database name
- `MYSQL_USER` _(string)_ mysql user
- `MYSQL_PASSWORD` _(string)_ mysql user password
- `MYSQL_HOST` _(string)_ mysql host
- `MYSQL_PORT` _(string)_ mysql port
- `EVENT_QUEUE_NAME` _(string)_ rabbitmq queue name for publishing events
- `NOTIFICATION_QUEUE_NAME` _(string)_ rabbitmq queue name for publishing notifications
- `NOTIFICATION_TRIES` _(string)_ number of attempts to send notification to subscriber's endpoint
- `RABBITMQ_URL` _(string)_ rabbitmq connect address

