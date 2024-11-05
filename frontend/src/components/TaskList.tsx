"use client";

import { Task } from "@/api/generated";

interface TaskListProps {
    tasks: Task[];
    onStatusChange?: (taskId: string | undefined) => void;
    onTaskDelete?: (taskId: string | undefined) => void;
}

export default function TaskList({ tasks, onStatusChange, onTaskDelete }: TaskListProps) {
    return (
        <div className="mt-6 space-y-2">
            {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                    <span
                        className={`text-lg flex-grow ${
                            task.status === "completed" ? "line-through text-gray-500" : "text-gray-800"
                        }`}
                    >
                        {task.title}
                    </span>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => onStatusChange?.(task.id)}
                            className={`p-2 rounded-full transition-colors ${
                                task.status === "completed"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                        >
                            {task.status === "completed" ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0"
                                    />
                                </svg>
                            )}
                        </button>

                        {task.status === "completed" && (
                            <button
                                onClick={() => onTaskDelete?.(task.id)}
                                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
