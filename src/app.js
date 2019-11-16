import bodyParser from "body-parser";
import express from "express";
import {
  errorHandlerMiddleware,
  errorLoggerMiddleware,
  requestLoggerMiddleware
} from "./middleware";
import router from "./router";

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Before the router attach request logger
app.use(requestLoggerMiddleware);

// API Router
app.use(router);

// After the router attach error logger
app.use(errorLoggerMiddleware);
app.use(errorHandlerMiddleware);

export default app;
