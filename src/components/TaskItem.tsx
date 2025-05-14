
"use client";

import type { Task } from '@/types/task';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2, CalendarDays, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, parseISO } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskItem({ task, onToggleComplete, onDeleteTask }: TaskItemProps) {
  const getPriorityBadgeVariant = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default'; // Uses primary color
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div 
      className={cn(
        "flex flex-col p-4 bg-card rounded-lg shadow-md mb-3 transition-all duration-300 ease-in-out",
        task.completed ? "opacity-60" : "opacity-100"
      )}
      data-state={task.completed ? "completed" : "active"}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3 flex-grow">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            aria-labelledby={`task-desc-${task.id}`}
            className="mt-1 border-primary data-[state=checked]:bg-accent data-[state=checked]:border-accent"
          />
          <label
            htmlFor={`task-${task.id}`}
            id={`task-desc-${task.id}`}
            className={cn(
              "text-base font-medium flex-grow cursor-pointer transition-colors duration-300",
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
          className="text-destructive hover:bg-destructive/10 hover:text-destructive ml-2 shrink-0"
          aria-label={`Delete task: ${task.description}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-2 pl-7 space-y-1"> {/* Aligned with checkbox */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <Badge variant={getPriorityBadgeVariant(task.priority)} className="capitalize">
            {task.priority}
          </Badge>
          {task.dueDate && (
            <span className="flex items-center">
              <CalendarDays className="mr-1 h-3.5 w-3.5" />
              Due: {format(parseISO(task.dueDate), "MMM d, yyyy")}
            </span>
          )}
        </div>
        
        {task.notes && (
          <div className="flex items-start text-sm text-muted-foreground mt-1">
            <StickyNote className="mr-2 h-4 w-4 mt-0.5 shrink-0" />
            <p className="whitespace-pre-wrap break-words">{task.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
