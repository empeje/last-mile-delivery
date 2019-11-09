# Last Mile Delivery API

## How to run

* You can run the following script which run our [docker-compose](./docker-compose.yml) setup in detached mode and then attached to the logs so that you'll not stop the app when you detached from the log.

```bash
./start.sh
```

## Design Documentation

The architectural design of the system can be open at [empeje.github.io/last-mile-delivery][DESIGN_DOCS]

### Maintaining Documentation

1. You can maintain the documentation by adding [mermaid-js][MERMAID] diagram DSL in the `docs/index.html`
2. Upload the GitHub pages using

    ```bash
    yarn deploy:docs
    ```
    
## Development Infrastructure Checklist

| Metrics             | Notes                                                         | Implemented |
|---------------------|---------------------------------------------------------------|-------------|
| Code Quality        | Standardization and static check using ESLint                 | - [x] Yes   |
| Unit Testing        | Unit level testing for models                                 |             |
| Integration Testing | Integration level testing e.g. API                            |             |
| End-to-end Testing  | Blackbox testing, running real service with real ext. service |             |
| Auto-reload in Dev  | File watcher that auto reload whenever changes occurs         | - [x] Yes   |

## Production Checklist

| Metrics             | Notes                                                            | Implemented |
|---------------------|------------------------------------------------------------------|-------------|
| Codebase            | One codebase tracked in revision control, many deploys           | - [x] Yes   |
| Dependencies        | Explicitly declare and isolate dependencies                      | - [x] Yes   |
| Config              | Store config in the environment                                  | - [x] Yes   |
| Backing services    | Treat backing services as attached resources                     |             |
| Build, release, run | Strictly separate build and run stages                           |             |
| Processes           | Execute the app as one or more stateless processes               | - [x] Yes   |
| Port binding        | Export services via port binding                                 | - [x] Yes   |
| Concurrency         | Scale out via the process model                                  |             |
| Disposability       | Maximize robustness with fast startup and graceful shutdown      |             |
| Dev/prod parity     | Keep development, staging, and production as similar as possible |             |
| Logs                | Treat logs as event streams                                      |             |
| Admin processes     | Run admin/management tasks as one-off processes                  |             |

[DESIGN_DOCS]: https://empeje.github.io/last-mile-delivery/
[MERMAID]: https://mermaidjs.github.io/#/