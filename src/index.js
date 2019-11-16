import app from "./app";
import { PORT } from "./config";
import models from "./models";
import { logger } from "./utils";

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

process.on("SIGTERM", async () => {
  logger.info("SIGTERM signal received.");

  logger.info("Closing HTTP server.");
  await server.close();
  logger.info("HTTP server closed.");

  logger.info("Closing database connection.");
  await models.sequelize.connectionManager.close();
  logger.info("Database connection closed.");
});
