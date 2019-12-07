# Last Mile Delivery API

[![Build Status](https://travis-ci.com/empeje/last-mile-delivery.svg?branch=master)](https://travis-ci.com/empeje/last-mile-delivery)
[![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/amappuji?utm_source=github&utm_medium=button&utm_term=amappuji&utm_campaign=github)
[![Made in Indonesia](https://img.shields.io/badge/made%20in-indonesia-red?style=plastic&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABgAAAAAQAAAGAAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAA6gAwAEAAAAAQAAAA4AAAAAoZe4PgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAf9JREFUKBV9Ur9PFFEQnvdjd8+DUwv0YrJhQ454PZXFAbEzdDZWZ2FiZcGfQ3Wdl1jQWF1FMBI0FrRG74LIhuM8chAIgd3bfbvznFnwIkad5Nt9b+Z9876ZeQIABMESyoSAgIS/mSRnSIgIgknwFGB5cWWl/bDR8F2lcoEoxVUIrLVgpcQsz1Vve7v/odNprgO818QrP6rX2y9XV/3K7KyBLHM42XVO0sJiQIHWZmlhwc92v7XXe906E4O5Ws13u12DOzuSbsMJiSlsTJZSepWKqc3XfOh1Ayai+h7m+eam42mNVggprm4pOAWPPlQTWlLjhmHOHCaC/fJZiv09gDjm7T9NOA5IY+QMndBzlRmw8wFg9R7tKM8ft02yULMsVWFHx1D5ugfaffwE7ItnYJcbAFNTADkpue7ohMT9UTSNNAX4+Anc1hvQqecCeB7ALRqjS+v/mFUarEtnySQfRZMhZqZwFHJIbjG/X3+SyIaGppWmyFRZLZVklCQqHifMpFlLpOHfAPs4dhHH5vwyUvfvlKTcer0W/jga9Ycnp87x6RnGSSJT6pzJsgK8HpOPY4ejE+dgMOxvtN6GPI5of3DU7Gy8a/sPqv7t6enc0erGk6PnhucXlwXp4HDYBBhE1GMrqIvct/LS81fB2XiMCW1+N67pLsnbaq0Vj5zqFz8BHc350tk1bDEAAAAASUVORK5CYII=)](https://github.com/made-in-indonesia/made-in-indonesia)

## Live Preview

You can use [https://last-mile-delivery.herokuapp.com/][heroku_instance] for Live Preview, this instance running on free Dyno hours, so please expect error when our database records limit or hours limit reached.

## How to run from source

- Copy `.env.example` to `.env`, this `.env` file will be used in local for test, and development purposes. For production .env will not be used and system environment variables will be used.

```bash
$ cp .env.example .env
```

- Edit `.env` file as needed, here are the most important config to change

```bash
PORT=8080 # this is the port we want to expose, if you change this, please look at the `docker-compose.yml` as well
GOOGLE_MAPS_API_KEY= # this is the Google Maps API Key
```

- You can run the following script which run our [docker-compose](./docker-compose.yml) setup in detached mode and then attached to the logs so that you'll not stop the app when you detached from the log.

```bash
$ ./start.sh
```

## How to run from packaged Docker image

We've prebuild Docker image stored as [mappuji/last-mile-delivery][hub_registry] in DockerHub. Where you can run it like this

```bash
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml
```

This run exactly the same thing with running it from source except we use prebuilt image that already pushed to DockerHub.

## Design Documentation

The architectural design of the system can be open at [empeje.github.io/last-mile-delivery][design_docs].

### Maintaining Documentation

1. You can maintain the documentation by adding [mermaid-js][mermaid] diagram DSL in the `docs/index.html`
2. Upload the GitHub pages using

   ```bash
   $ yarn deploy:docs
   ```

## Development Infrastructure Checklist

| Metrics             | Notes                                                         | Implemented |
| ------------------- | ------------------------------------------------------------- | ----------- |
| Code Quality        | Standardization and static check using ESLint                 | ✓ Yes       |
| Unit Testing        | Unit level testing for models                                 | ✓ Yes       |
| Integration Testing | Integration level testing e.g. API                            | ✓ Yes       |
| End-to-end Testing  | Blackbox testing, running real service with real ext. service | NA          |
| Auto-reload in Dev  | File watcher that auto reload whenever changes occurs         | ✓ Yes       |
| Continuous Int.     | Continuous integration using Travis CI for public repository  | ✓ Yes       |

## Production Checklist

| Metrics             | Notes                                                            | Implemented |
| ------------------- | ---------------------------------------------------------------- | ----------- |
| Codebase            | One codebase tracked in revision control, many deploys           | ✓ Yes       |
| Dependencies        | Explicitly declare and isolate dependencies                      | ✓ Yes       |
| Config              | Store config in the environment                                  | ✓ Yes       |
| Backing services    | Treat backing services as attached resources                     | ✓ Yes       |
| Build, release, run | Strictly separate build and run stages                           | ✓ Yes       |
| Processes           | Execute the app as one or more stateless processes               | ✓ Yes       |
| Port binding        | Export services via port binding                                 | ✓ Yes       |
| Concurrency         | Scale out via the process model                                  | ✓ Yes       |
| Disposability       | Maximize robustness with fast startup and graceful shutdown      | ✓ Yes       |
| Dev/prod parity     | Keep development, staging, and production as similar as possible | ✓ Yes       |
| Logs                | Treat logs as event streams                                      | ✓ Yes       |
| Admin processes     | Run admin/management tasks as one-off processes                  | NA          |

## Deployment Using Heroku Docker

### Update your Heroku CLI

This meant to update your Heroku CLI to support setting up via heroku manifest setup

```bash
$ heroku update beta
$ heroku plugins:install @heroku-cli/plugin-manifest
```

### Create your Heroku app

```bash
$ heroku create your-app-name --manifest
```

### Create Clear DB add-ons

```bash
$ heroku addons:create cleardb:ignite
# command below will return
# CLEARDB_DATABASE_URL: mysql://<username>:<password>@<url>/<database_name>?reconnect=true
$ heroku config | grep CLEARDB_DATABASE_URL # copy the information to config

# Set database configuration
heroku config:set PORT=8080
heroku config:set LOG_FORMAT=simple
heroku config:set SQL_DATABASE=YOUR_HEROKU_DATABASE
heroku config:set SQL_HOST=YOUR_HEROKU_DATABASE_HOST
heroku config:set SQL_PASSWORD=YOUR_HEROKU_DATABASE_PASSWORD
heroku config:set SQL_USERNAME=YOUR_HEROKU_DATABASE_USERNAME
heroku config:set SQL_DIALECT=mysql
heroku config:set SQL_OPERATOR_ALIASES=false
heroku config:set SQL_SEEDER_STORAGE=sequelize
heroku config:set SQL_SEEDER_STORAGE_TABLE_NAME=SequelizeData
heroku config:set GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

### Deploy your app

```bash
$ git push heroku master
```

[design_docs]: https://empeje.github.io/last-mile-delivery/
[mermaid]: https://mermaidjs.github.io/#/
[hub_registry]: https://hub.docker.com/repository/docker/mappuji/last-mile-delivery
[heroku_instance]: https://last-mile-delivery.herokuapp.com/
