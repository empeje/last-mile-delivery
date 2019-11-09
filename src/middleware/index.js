import * as expressWinston from "express-winston";
import { transports } from "winston";
import { logFormat } from "../utils";

export const requestLoggerMiddleware = expressWinston.logger({
  transports: [new transports.Console()],
  format: logFormat
});

export const errorLoggerMiddleware = expressWinston.errorLogger({
  transports: [new transports.Console()],
  format: logFormat
});
