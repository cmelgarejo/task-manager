# Task Management System

A modern task management system built with Next.js 15, TypeScript, and Express.
This project demonstrates a scalable architecture ready for future enhancements.

Used one of my favorite AI tools: [Cline](https://github.com/cline/cline)
(it's a vscode extension) to create this project.

Clocked in 3 hours ind 16 minutes, mostly reading latest docs on NextJS 15
and Express 5, and deciding how should the project be structured.

## Project Structure

```bash
task-management/
├── docker-compose.yml      # Docker compose configuration
├── backend/               # Express backend
│   ├── Dockerfile        # Backend Docker configuration
│   ├── src/
│   │   ├── repositories/ # Repository pattern implementation
│   │   ├── services/     # Business logic layer
│   │   ├── types/        # TypeScript types
│   │   ├── swagger.ts    # OpenAPI (Swagger) specification
│   │   └── index.ts      # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/             # Next.js frontend
    ├── Dockerfile       # Frontend Docker configuration
    ├── src/
    │   ├── api/generated   # OpenAPI client generation
    │   ├── app/            # Next.js app directory
    │   └── components/     # React components
    ├── package.json
    └── tsconfig.json
```

## Features

-   Task creation and management
-   Status toggle functionality
-   Type-safe API integration
-   Modern UI with Tailwind CSS
-   Repository pattern for data access
-   Docker containerization
-   OpenAPI (Swagger) specification for API documentation
-   API Routes for "Secure" Backend Communication

## Technical Stack

### Backend

-   Node.js with Express 5
-   TypeScript
-   OpenAPI (Swagger) specification

### Frontend

-   Next.js 15 with App Router
-   TypeScript
-   Tailwind CSS for styling

## Backend: OpenAPI (Swagger) Integration

The backend server generates an OpenAPI (Swagger) specification file that
documents the API. This can be accessed at <http://localhost:3001/docs>

The OpenAPI specification includes:

-   Detailed documentation of the API endpoints
-   Definitions for the `Task` and `CreateTaskDTO` types
-   Response schemas for each endpoint

This allows the frontend to be able to:

## Frontend: OpenAPI Client Generation

The frontend uses the `@openapitools/openapi-generator-cli` package to generate
a TypeScript client based on the backend's OpenAPI specification. This ensures
a type-safe integration between the frontend and backend.

The generated client is located in the `frontend/src/api` directory and is used
throughout the frontend code to interact with the backend API.

This way the frontend and backend can be kept in sync with each other.

## Running with Docker Compose

### Start the containers

```bash
docker compose up --build
```

### Stop the containers

```bash
docker compose down
```

The services will be available at:

-   Frontend: <http://localhost:3000>
-   Backend: <http://localhost:3001>
-   Swagger UI: <http://localhost:3001/docs>

## Manual Setup (Without Docker)

If you prefer to run the services without Docker:

1. Install dependencies:

    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

2. Start the backend server:

    ```bash
    cd backend
    npx ts-node-dev src/index.ts
    ```

    The backend will run on <http://localhost:3001>

3. Start the frontend development server:

    ```bash
    cd frontend
    npm run dev
    ```

    The frontend will run on <http://localhost:3000>

## Implementation Details

### Backend Implementation

-   Repository pattern for data access abstraction
-   Service layer for business logic
-   RESTful endpoints with proper error handling
-   CORS configuration for frontend access
-   OpenAPI (Swagger) specification generation
-   Docker containerization

### Frontend Implementation

-   Components:
    -   TaskList: Displays tasks with status toggle
    -   TaskForm: Handles task creation
-   Tailwind CSS for responsive design
-   Error handling and loading states
-   **API Routes to Hide Backend Calls**
    -   Proxy backend requests through `/api` endpoints
    -   "Secure" communication between frontend and backend
-   Client-side components for interactivity
-   OpenAPI client generation
-   Docker containerization

## Future Enhancements

The system is designed to scale with future requirements:

-   Database integration (easily achievable through the implemented repository pattern)
-   User authentication
-   Real-time updates using WebSockets
-   Mobile app support
-   Third-party services integration (i.e: Push Notifications with Firebase)
-   Offline capabilities (i.e: Offline Mode using IndexedDB)
-   Container orchestration for production (k8s, docker swarm)
-   Github CD/CI Actions
-   GraphQL support

## Development Process

1. Initial Setup:

    - Created backend with Express and TypeScript
    - Implemented repository pattern
    - Set up Next.js 15 frontend
    - Configured TypeScript and development tools
    - Added Docker containerization
    - Implemented OpenAPI (Swagger) specification

2. Backend Development:

    - Implemented task repository interface
    - Created in-memory repository implementation
    - Added service layer for business logic
    - Created RESTful endpoints
    - Added error handling
    - Configured CORS
    - Implemented OpenAPI (Swagger) specification

3. Frontend Development:

    - Created React components with TypeScript
    - Implemented Tailwind CSS styling
    - Added form validation
    - Integrated with backend API using OpenAPI client

4. Docker Configuration:

    - Created Dockerfiles for both services
    - Set up docker-compose for orchestration
    - Configured development volumes
    - Added network configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE)
file for details.
