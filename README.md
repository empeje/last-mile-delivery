# Last Mile Delivery API

## Design Documentation

The architectural design of the system can be open at [empeje.github.io/last-mile-delivery][DESIGN_DOCS]

### Maintaining Documentation

1. You can maintain the documentation by adding [mermaid-js][MERMAID] diagram DSL in the `docs/index.html`
2. Upload the GitHub pages using

    ```bash
    yarn deploy:docs
    ```
    
## Production Checklist

| Metrics             | Notes                                                            | Implemented |
|---------------------|------------------------------------------------------------------|-------------|
| Codebase            | One codebase tracked in revision control, many deploys           | Yes         |
| Dependencies        | Explicitly declare and isolate dependencies                      | Yes         |
| Config              | Store config in the environment                                  | Yes         |
| Backing services    | Treat backing services as attached resources                     |             |
| Build, release, run | Strictly separate build and run stages                           |             |
| Processes           | Execute the app as one or more stateless processes               | Yes         |
| Port binding        | Export services via port binding                                 | Yes         |
| Concurrency         | Scale out via the process model                                  |             |
| Disposability       | Maximize robustness with fast startup and graceful shutdown      |             |
| Dev/prod parity     | Keep development, staging, and production as similar as possible |             |
| Logs                | Treat logs as event streams                                      |             |
| Admin processes     | Run admin/management tasks as one-off processes                  |             |

[DESIGN_DOCS]: https://empeje.github.io/last-mile-delivery/
[MERMAID]: https://mermaidjs.github.io/#/