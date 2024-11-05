import swaggerJSDoc, { Options } from "swagger-jsdoc";
import { Task } from "./types/task";

const swaggerOptions: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API",
            version: "1.0.0",
            description: "API for managing tasks"
        },
        components: {
            schemas: {
                Task: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string"
                        },
                        title: {
                            type: "string"
                        },
                        status: {
                            type: "string",
                            enum: ["pending", "completed"]
                        }
                    }
                },
                CreateTaskDTO: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string"
                        }
                    },
                    required: ["title"]
                }
            }
        }
    },
    apis: ["./src/index.ts"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
