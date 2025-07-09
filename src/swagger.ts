import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User-Device Assignment API",
      version: "1.0.0",
      description: "Backend API for managing users, devices, and their assignments using TypeORM, Express, and TypeScript.",
    },
    tags: [
      {
        name: "Users",
        description: "Operations related to users",
      },
      {
        name: "Devices",
        description: "Operations related to devices",
      },
      {
        name: "Assignments",
        description: "Assign or unassign users to devices",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Scan all route files for JSDoc @swagger comments
});
