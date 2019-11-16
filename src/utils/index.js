import { createValidator } from "express-joi-validation";
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

export const validator = createValidator({
  passError: true
});

export const paginate = ({ page, pageSize }) => {
  const offset = page * pageSize;
  const limit = offset + pageSize;

  return {
    offset,
    limit
  };
};
