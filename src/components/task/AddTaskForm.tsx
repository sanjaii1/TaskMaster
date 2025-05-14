"use client";

import type * as React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AddTaskFormProps {
  newTaskDescription: string;
  setNewTaskDescription: (description: string) => void;
  onAddTask: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function AddTaskForm({ newTaskDescription, setNewTaskDescription, onAddTask }: AddTaskFormProps) {
  return (
    <form onSubmit={onAddTask} className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="Enter new task..."
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        className="flex-grow"
        aria-label="New task description"
      />
      <Button type="submit" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
        <Plus className="mr-2 h-4 w-4" /> Add Task
      </Button>
    </form>
  );
}
