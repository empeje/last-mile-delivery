import app from "./app";
import {PORT} from "./config";
import {errorLoggerMiddleware, requestLoggerMiddleware} from "./middleware";
import router from "./routes";
import {logger} from "./utils";

// Before the router attach request logger
app.use(requestLoggerMiddleware);

// API Router
app.use(router);

// After the router attach error logger
app.use(errorLoggerMiddleware);

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

process.on("SIGTERM", async () => {
  logger.info("SIGTERM signal received.");
  logger.info("Closing HTTP server.");
  server.close(async () => {
    logger.info("HTTP server closed.");

    // TODO: Close database connection here
  });
});
