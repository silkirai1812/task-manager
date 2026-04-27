import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart Task Manager API",
      version: "1.0.0",
      description: "REST API for Smart Task Manager with AI-powered task summarization and priority suggestion",
    },
    servers: [
      {
        url: "https://taskmanager-bhfq.onrender.com/api",
        description: "Production server",
      },
      {
        url: "http://localhost:4000/api",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerJsdoc(options);