import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./config/swagger";
import apiRoutes from "./routes";
import {
  internalServerErrorResponse,
  notFoundResponse,
} from "./services/common";

// Load environment variables
dotenv.config();
const isDeveloptment = process.env.NODE_ENV === "development";

// Check for necessary environment variables
const requiredEnvVars = [
  "PORT",
  "GHL_CLIENT_ID",
  "GHL_CLIENT_SECRET",
  "GHL_BASE_URL",
];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: Environment variable ${envVar} is not set.`);
    process.exit(1);
  }
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions()));

// API routes
app.use("/api", apiRoutes);

// 404 handler
app.use((req, res, next) => {
  notFoundResponse(res, "Not Found");
});

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    internalServerErrorResponse(res, "Internal Server Error", err);
  }
);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/`);
});

export default app;
