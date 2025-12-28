import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, priority } = req.body;
        const task = await prisma.task.create({
            data: {
                title,
                description,
                priority
            },
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, completed, priority } = req.body;
        const task = await prisma.task.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                completed,
                priority
            },
        });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.task.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
};
