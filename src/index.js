import app from "./app";
import { PORT } from "./config";
import { logger } from "./utils";

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
