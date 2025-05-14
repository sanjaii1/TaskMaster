"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Task } from '@/types/task';
import { AddTaskForm } from '@/components/task/AddTaskForm';
import { FilterTabs } from '@/components/task/FilterTabs';
import { TaskList } from '@/components/task/TaskList';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function TaskMasterPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks from localStorage", error);
      toast({
        title: "Error",
        description: "Could not load tasks from local storage.",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error("Failed to save tasks to localStorage", error);
        toast({
          title: "Error",
          description: "Could not save tasks to local storage.",
          variant: "destructive",
        });
      }
    }
  }, [tasks, isMounted, toast]);

  const handleAddTask = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTaskDescription.trim() === '') {
      toast({
        title: "Empty Task",
        description: "Task description cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    const newTask: Task = {
      id: crypto.randomUUID(),
      description: newTaskDescription.trim(),
      completed: false,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setNewTaskDescription('');
    toast({
      title: "Task Added",
      description: `"${newTask.description}" has been added.`,
    });
  }, [newTaskDescription, toast]);

  const handleToggleComplete = useCallback((taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleDeleteTask = useCallback((taskId: string) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    if (taskToDelete) {
      toast({
        title: "Task Deleted",
        description: `"${taskToDelete.description}" has been deleted.`,
        variant: "destructive"
      });
    }
  }, [tasks, toast]);

  const filteredTasks = useMemo(() => {
    if (filter === 'active') {
      return tasks.filter(task => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    return tasks;
  }, [tasks, filter]);

  if (!isMounted) {
    // Render a simple loading state or null to avoid hydration mismatch with localStorage
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading TaskMaster...</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4 py-8 flex justify-center">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">TaskMaster</CardTitle>
        </CardHeader>
        <CardContent>
          <AddTaskForm
            newTaskDescription={newTaskDescription}
            setNewTaskDescription={setNewTaskDescription}
            onAddTask={handleAddTask}
          />
          <FilterTabs currentFilter={filter} onSetFilter={setFilter} />
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
          />
        </CardContent>
      </Card>
    </main>
  );
}
