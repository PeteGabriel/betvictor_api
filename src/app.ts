import * as express from "express";
import "reflect-metadata";
import * as bodyParser from "body-parser";
const errorHandler = require("errorhandler");
import { logger } from './3infrastructure/config/Logger';
import container from './3infrastructure/config/inversify.config';
import { Registrable } from "./1presentation/controllers/Registrable";
import TYPES from "./3infrastructure/config/types";

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// grabs the Controller from IoC container and registers all the endpoints
const controllers: Registrable[] = container.getAll<Registrable>(TYPES.Controller);
controllers.forEach(controller => controller.register(app));

/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV === "dev") {
    app.use(errorHandler());
}
else {
    app.use(function (err: Error, _: express.Request, __: express.Response, next: express.NextFunction) {
        logger.error(err.stack);
        next(err);
    });
}

app.get("/favicon.ico", function(_, res) {
    res.status(204);
});

// catch 404 and forward to error handler
app.use(function(_, res, next) {
  const err = new Error("Not Found");
  res.status(404);
  next(err);
});


export default app;