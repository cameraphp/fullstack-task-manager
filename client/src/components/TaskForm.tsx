import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { CreateTaskInput, Task, UpdateTaskInput } from '@/lib/api';

interface TaskFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: CreateTaskInput | UpdateTaskInput) => Promise<void>;
    initialData?: Task | null;
}

export const TaskForm: React.FC<TaskFormProps> = ({
    open,
    onOpenChange,
    onSubmit,
    initialData,
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            if (initialData) {
                setTitle(initialData.title);
                setDescription(initialData.description || '');
                setPriority(initialData.priority);
            } else {
                setTitle('');
                setDescription('');
                setPriority('medium');
            }
        }
    }, [open, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({
                title,
                description,
                priority,
            });
            onOpenChange(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Task' : 'Create Task'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Update the details of your task.' : 'Add a new task to your list.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="priority" className="text-right">
                                Priority
                            </Label>
                            <Select
                                value={priority}
                                onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
