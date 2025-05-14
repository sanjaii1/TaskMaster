"use client";

import type { Task } from '@/types/task';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskItem({ task, onToggleComplete, onDeleteTask }: TaskItemProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-between p-3 bg-card rounded-lg shadow mb-2 transition-all duration-300 ease-in-out",
        task.completed ? "opacity-70" : "opacity-100"
      )}
      data-state={task.completed ? "completed" : "active"}
    >
      <div className="flex items-center gap-3 flex-grow">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          aria-labelledby={`task-desc-${task.id}`}
          className="border-primary data-[state=checked]:bg-accent data-[state=checked]:border-accent"
        />
        <label
          htmlFor={`task-${task.id}`}
          id={`task-desc-${task.id}`}
          className={cn(
            "text-sm flex-grow cursor-pointer transition-colors duration-300",
            task.completed ? "line-through text-muted-foreground" : "text-card-foreground"
          )}
        >
          {task.description}
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDeleteTask(task.id)}
        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        aria-label={`Delete task: ${task.description}`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
