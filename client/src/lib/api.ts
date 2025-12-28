const API_URL = 'http://localhost:3000/api/tasks';

export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskInput {
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
}

export interface UpdateTaskInput {
    title?: string;
    description?: string;
    completed?: boolean;
    priority?: 'low' | 'medium' | 'high';
}

export const getTasks = async (): Promise<Task[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
};

export const createTask = async (task: CreateTaskInput): Promise<Task> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
};

export const updateTask = async (id: number, task: UpdateTaskInput): Promise<Task> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
};
