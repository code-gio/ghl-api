import swaggerJsdoc from "swagger-jsdoc";

export function swaggerOptions() {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Go High Level API",
        version: "1.0.0",
        description: "A simple Express library for Go High Level API",
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Local server",
        },
      ],
    },
    apis: ["./src/routes/*.ts"],
  };

  return swaggerJsdoc(options);
}
