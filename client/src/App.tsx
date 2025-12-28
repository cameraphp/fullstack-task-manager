import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask, type Task } from '@/lib/api';
import { TaskCard } from '@/components/TaskCard';
import { TaskForm } from '@/components/TaskForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
// import { Toaster } from 'sonner'; 
// I will remove Toaster for now or use simple alerts if I didn't install toast.
// Plan: Install sonner? "npx shadcn@latest add sonner"? Or just use standard error handling.
// I didn't install sonner. I'll stick to console/alert or just UI updates.

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, data);
      } else {
        await createTask(data);
      }
      await fetchTasks();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task');
    }
  };

  const handleStatusUpdate = async (id: number, completed: boolean) => {
    try {
      // Optimistic update
      setTasks(tasks.map(t => t.id === id ? { ...t, completed } : t));
      await updateTask(id, { completed });
    } catch (error) {
      console.error('Error updating status:', error);
      fetchTasks(); // Revert on error
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
            <p className="text-muted-foreground mt-1">
              Manage your tasks efficiently and stay organized.
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" /> New Task
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center p-8">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center p-12 border rounded-lg bg-card text-muted-foreground">
            No tasks found. Create one to get started!
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={handleStatusUpdate}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}

        <TaskForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleFormSubmit}
          initialData={editingTask}
        />
      </div>
    </div>
  );
}

export default App;
