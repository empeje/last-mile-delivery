import * as expressWinston from "express-winston";
import { transports } from "winston";
import { NotFoundError } from "../errors";
import { logFormat, logger } from "../utils";

export const requestLoggerMiddleware = expressWinston.logger({
  transports: [new transports.Console()],
  format: logFormat
});

export const errorLoggerMiddleware = expressWinston.errorLogger({
  transports: [new transports.Console()],
  format: logFormat
});

export const notFoundMiddleware = (req, res, next) => {
  if (!req.route) {
    const err = new NotFoundError("Not found.");
    next(err);
  }
  next();
};

// eslint-disable-next-line no-unused-vars
export const errorHandlerMiddleware = (err, req, res, next) => {
  let statusCode = err.status;
  let errorMessage = err.message;
  const errorName = err.name;

  switch (errorName) {
    case "Error":
      statusCode = 500;
      break;
    case "NotFoundError":
      statusCode = 404;
      break;
    default:
      logger.error(err);
      statusCode = statusCode || 500;
      errorMessage = errorMessage || "Internal server error.";
  }

  res.status(statusCode).send({ error: errorMessage });
};
