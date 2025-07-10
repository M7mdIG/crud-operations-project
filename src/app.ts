// Enable TypeORM decorators and metadata reflection
import "reflect-metadata";

// Core imports
import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

// Database connection
import { AppDataSource } from "./config/data-source";

// Routes
import userRoutes from "./routes/user.routes";
import deviceRoutes from "./routes/device.routes";
import assignmentRoutes from "./routes/assignment.routes";

// Global error handler middleware
import { errorHandler } from "./middleware/errorHandler";

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Enable JSON request parsing
app.use(express.json());

// Initialize and connect to the database
AppDataSource.initialize()
  .then(() => {
    console.log("[✓] Database connected");

    // Serve Swagger documentation
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // API Routes
    app.use("/api/users", userRoutes);
    app.use("/api/devices", deviceRoutes);
    app.use("/api/assignments", assignmentRoutes);

    // Root route for sanity check
    app.get("/", (_req, res) => {
      res.send("[✓] API is running");
    });

    // Register global error handler (must be after all routes)
    app.use(errorHandler);

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`[-] Server is listening on http://localhost:${PORT}, to check swagger documentation go to http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("[X] Failed to connect to DB:", err);
  });
