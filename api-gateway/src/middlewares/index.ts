import * as OpenApiValidator from "express-openapi-validator";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import express from "express";

const swaggerDocument = YAML.load("../swagger.yaml");
const applyAllMiddlewares = (app) => {
  app.use([
    express.urlencoded({ extended: true }),
    express.json(),
    helmet(),
    morgan("dev"),
  ]);
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  app.use(
    OpenApiValidator.middleware({
      apiSpec: "../swagger.yaml",
    })
  );
};

export default applyAllMiddlewares;
