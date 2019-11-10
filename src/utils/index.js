import { createLogger, format, transports } from "winston";
import { LOG_FORMAT } from "../config";

const { simple, json, combine, timestamp, colorize } = format;

export const logFormat = combine(
  LOG_FORMAT === "json" ? json() : simple(),
  timestamp(),
  colorize()
);

export const logger = (() => {
  return createLogger({
    format: logFormat,
    transports: [new transports.Console()]
  });
})();
