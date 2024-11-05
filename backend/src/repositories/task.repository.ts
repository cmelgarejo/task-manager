import { Task } from "../types/task";

export interface ITaskRepository {
    findAll(): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
    create(task: Omit<Task, "id">): Promise<Task>;
    update(id: string, task: Partial<Task>): Promise<Task | null>;
    delete(id: string): Promise<boolean>;
}

export class InMemoryTaskRepository implements ITaskRepository {
    private tasks: Task[] = [];

    async findAll(): Promise<Task[]> {
        return [...this.tasks];
    }

    async findById(id: string): Promise<Task | null> {
        const task = this.tasks.find((t) => t.id === id);
        return task ? { ...task } : null;
    }

    async create(taskData: Omit<Task, "id">): Promise<Task> {
        const task: Task = {
            id: Math.random().toString(36).substr(2, 9),
            ...taskData
        };
        this.tasks.push(task);
        return { ...task };
    }

    async update(id: string, taskData: Partial<Task>): Promise<Task | null> {
        const index = this.tasks.findIndex((t) => t.id === id);
        if (index === -1) return null;

        const updatedTask = {
            ...this.tasks[index],
            ...taskData
        };
        this.tasks[index] = updatedTask;
        return { ...updatedTask };
    }

    async delete(id: string): Promise<boolean> {
        const initialLength = this.tasks.length;
        if (this.tasks.find((t) => t.id === id && t.status !== "completed")) return false;
        this.tasks = this.tasks.filter((t) => t.id !== id);
        return this.tasks.length !== initialLength;
    }
}

export class YouFavoriteDBTaskRepository implements ITaskRepository {
    async findAll(): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    async create(taskData: Omit<Task, "id">): Promise<Task> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, taskData: Partial<Task>): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
