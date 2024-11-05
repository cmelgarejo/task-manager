import { Task } from "../types/task";
import { ITaskRepository } from "../repositories/task.repository";

export class TaskService {
    constructor(private taskRepository: ITaskRepository) {}

    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepository.findAll();
    }

    async createTask(title: string): Promise<Task> {
        const newTask = await this.taskRepository.create({
            title,
            status: "pending"
        });
        return newTask;
    }

    async toggleTaskStatus(id: string): Promise<Task | null> {
        const task = await this.taskRepository.findById(id);
        if (!task) return null;

        const newStatus = task.status === "pending" ? "completed" : "pending";
        return await this.taskRepository.update(id, { status: newStatus });
    }

    async deleteTask(id: string): Promise<boolean> {
        return await this.taskRepository.delete(id);
    }
}
