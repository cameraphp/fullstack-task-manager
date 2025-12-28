import React from 'react';
import type { Task } from '@/lib/api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Edit } from 'lucide-react';

interface TaskCardProps {
    task: Task;
    onUpdate: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
    onEdit: (task: Task) => void;
}

const priorityColors = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete, onEdit }) => {
    return (
        <Card className={`w-full transition-all hover:shadow-lg ${task.completed ? 'opacity-60 bg-muted/50' : 'bg-card'}`}>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center space-x-3">
                    <Checkbox
                        checked={task.completed}
                        onCheckedChange={(checked) => onUpdate(task.id, checked as boolean)}
                        className="h-5 w-5"
                    />
                    <CardTitle className={`text-xl font-semibold ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                    </CardTitle>
                </div>
                <Badge className={`${priorityColors[task.priority]} text-white capitalize`}>
                    {task.priority}
                </Badge>
            </CardHeader>
            <CardContent>
                {task.description && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {task.description}
                    </p>
                )}
                <div className="mt-4 text-xs text-muted-foreground">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 pt-0 pb-4">
                <Button variant="ghost" size="icon" onClick={() => onEdit(task)}>
                    <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90" onClick={() => onDelete(task.id)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
};
