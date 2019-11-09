import app from "./app";
import { BACKEND_PORT } from "./config";
import { errorLoggerMiddleware, requestLoggerMiddleware } from "./middleware";
import router from "./routes";
import { logger } from "./utils";

// Before the router attach request logger
app.use(requestLoggerMiddleware);

// API Router
app.use(router);

// After the router attach error logger
app.use(errorLoggerMiddleware);

app.listen(BACKEND_PORT, () => {
  logger.info(`Server is running on port ${BACKEND_PORT}`);
});
