import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { InMemoryTaskRepository } from "./repositories/task.repository";
import { TaskService } from "./services/task.service";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize repository and service
const taskRepository = new InMemoryTaskRepository();
const taskService = new TaskService(taskRepository);

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Routes

/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Get the list of tasks
 *     responses:
 *       '200':
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
app.get("/tasks", async (req: express.Request, res: express.Response) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskDTO'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
app.post("/tasks", async (req: express.Request, res: express.Response) => {
    try {
        const { title } = req.body;

        if (!title) {
            res.status(400).json({ error: "Title is required" });
            return;
        }

        const newTask = await taskService.createTask(title);
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Failed to create task" });
    }
});

/**
 * @openapi
 * /tasks/{id}/toggle:
 *   patch:
 *     summary: Toggle task status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
app.patch("/tasks/:id/toggle", async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const updatedTask = await taskService.toggleTaskStatus(id);

        if (!updatedTask) {
            res.status(404).json({ error: "Task not found" });
            return;
        }

        res.json(updatedTask);
    } catch (error) {
        console.error("Error toggling task status:", error);
        res.status(500).json({ error: "Failed to toggle task status" });
    }
});

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: No Content
 */
app.delete("/tasks/:id", async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deleted = await taskService.deleteTask(id);

        if (!deleted) {
            res.status(404).json({ error: "Task not found" });
            return;
        }

        res.status(204).send();
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Failed to delete task" });
    }
});

app.get("/docs-json", (req: express.Request, res: express.Response) => {
    // send swaggerSpec as JSON response
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger UI is available at http://localhost:${PORT}/docs`);
});
