import { Request, Response, NextFunction } from "express";

/**
 * Global error-handling middleware.
 * Catches and formats any error passed via `next(err)` throughout the app.
 *
 * @param err - The error object thrown by async functions or middleware
 * @param req - Express Request object
 * @param res - Express Response object
 * @param _next - Unused next middleware (required by Express signature)
 */
export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  // Log the error message to the server console for debugging
  console.error("❌ Error:", err.message);

  // Send a JSON response with appropriate status code and message
  res.status(err.statusCode || 500).json({
    error: err.message || "Internal Server Error",
  });
}
