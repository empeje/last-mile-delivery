# Last Mile Delivery API

[![Build Status](https://travis-ci.com/empeje/last-mile-delivery.svg?branch=master)](https://travis-ci.com/empeje/last-mile-delivery)

## Live Preview

You can use [https://last-mile-delivery.herokuapp.com/][HEROKU_INSTANCE] for Live Preview, this instance running on free Dyno hours, so please expect error when our database records limit or hours limit reached.

## How to run from source

* You can run the following script which run our [docker-compose](./docker-compose.yml) setup in detached mode and then attached to the logs so that you'll not stop the app when you detached from the log.

```bash
./start.sh
```

## How to run from packaged Docker image

We've prebuild Docker image stored as [mappuji/last-mile-delivery][HUB_REGISTRY] in DockerHub. Where you can run it like this

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml
```

This run exactly the same thing with running it from source except we use prebuilt image that already pushed to DockerHub.

## Design Documentation

The architectural design of the system can be open at [empeje.github.io/last-mile-delivery][DESIGN_DOCS].

### Maintaining Documentation

1. You can maintain the documentation by adding [mermaid-js][MERMAID] diagram DSL in the `docs/index.html`
2. Upload the GitHub pages using

    ```bash
    yarn deploy:docs
    ```
    
## Development Infrastructure Checklist

| Metrics             | Notes                                                         | Implemented |
|---------------------|---------------------------------------------------------------|-------------|
| Code Quality        | Standardization and static check using ESLint                 | ✓ Yes       |
| Unit Testing        | Unit level testing for models                                 |             |
| Integration Testing | Integration level testing e.g. API                            |             |
| End-to-end Testing  | Blackbox testing, running real service with real ext. service |             |
| Auto-reload in Dev  | File watcher that auto reload whenever changes occurs         | ✓ Yes       |
| Continuous Int.     | Continuous integration using Travis CI for public repository  | ✓ Yes       |

## Production Checklist

| Metrics             | Notes                                                            | Implemented |
|---------------------|------------------------------------------------------------------|-------------|
| Codebase            | One codebase tracked in revision control, many deploys           | ✓ Yes       |
| Dependencies        | Explicitly declare and isolate dependencies                      | ✓ Yes       |
| Config              | Store config in the environment                                  | ✓ Yes       |
| Backing services    | Treat backing services as attached resources                     |             |
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

### Deploy your app

```bash
$ git push heroku master
```

[DESIGN_DOCS]: https://empeje.github.io/last-mile-delivery/
[MERMAID]: https://mermaidjs.github.io/#/
[HUB_REGISTRY]: https://hub.docker.com/repository/docker/mappuji/last-mile-delivery
[HEROKU_INSTANCE]: https://last-mile-delivery.herokuapp.com/