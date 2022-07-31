# Home Library Service

## Docker

You can download image from docker hub
```
docker pull shinkarenkomax97/nodejs2022q2-service_app
```

Compose image
```
docker compose -f "docker-compose.yaml" up --build
```

Scan vulnerablities
```
npm run scan
```

All `Dockerfile`s provided in **docker/** directory

Also you should to provide env variables to `.env` file

For example
```
PORT=4000
PG_HOST_PORT=5434
PG_CONTAINER_PORT=5432

PG_DB=nodejs2022q2
PG_USER=test
PG_PASSWORD=test
```

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/ShinkarenkoMaxim/nodejs2022Q2-service
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

You can also use **Postman**. Import provided `collection` and `environment` to your Postman.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
