"use client";

import { useEffect, useState } from "react";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import { Task } from "@/api/generated";

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const tasks = await fetch("/api").then((response) => response.json());
            setTasks(tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleAddTask = async (title: string) => {
        try {
            const createdTask = await fetch("/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title })
            }).then((response) => response.json());
            setTasks((prevTasks) => {
                return [...prevTasks, createdTask];
            });
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const handleDelete = async (id: string | undefined) => {
        if (!id) return;
        try {
            const response = await fetch(`/api`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            });

            if (response.ok) {
                setTasks(tasks.filter((t) => t.id !== id));
            } else {
                console.error("Failed to delete task");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleStatusChange = async (id: string | undefined) => {
        if (!id) return;
        try {
            const updatedTask = await fetch(`/api`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            }).then((response) => response.json());
            setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Task Management</h1>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <TaskForm onSubmit={handleAddTask} />
                    <TaskList tasks={tasks} onStatusChange={handleStatusChange} onTaskDelete={handleDelete} />
                </div>
            </div>
        </main>
    );
}
