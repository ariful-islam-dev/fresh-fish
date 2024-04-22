import express from "express";
import rateLimit from "express-rate-limit";

import applyAllMiddlewares from "./middlewares";
const app = express();

// Middleware

applyAllMiddlewares(app);

// Rate Limit

// Errors
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error["status"] = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      error: err.errors,
      message: err.message,
    },
  });
});

export default app;
