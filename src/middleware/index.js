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
  logger.error(err);
  console.log({ err });
  let statusCode = err.status;
  let errorMessage = err.message;
  const errorName = err.name;

  switch (errorName) {
    case "SequelizeConnectionRefusedError":
      statusCode = 500;
      break;
    case "Error":
      statusCode = 500;
      break;
    case "NotFoundError":
      statusCode = 404;
      break;
    default:
      statusCode = statusCode || 500;
      errorMessage = errorMessage || "Internal server error.";
  }

  // If coming from Joi
  if (!errorName && err.error) {
    statusCode = 400;
    errorMessage = err.error ? err.error.details : "Internal server error.";
  }

  res.status(statusCode).send({ error: errorMessage });
};
