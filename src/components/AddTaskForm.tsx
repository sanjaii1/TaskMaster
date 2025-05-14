
"use client";

import type * as React from 'react';
import type { Priority } from '@/types/task';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddTaskFormProps {
  newTaskDescription: string;
  setNewTaskDescription: (description: string) => void;
  newDueDate: Date | undefined;
  setNewDueDate: (date: Date | undefined) => void;
  newPriority: Priority;
  setNewPriority: (priority: Priority) => void;
  newNotes: string;
  setNewNotes: (notes: string) => void;
  onAddTask: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function AddTaskForm({ 
  newTaskDescription, setNewTaskDescription,
  newDueDate, setNewDueDate,
  newPriority, setNewPriority,
  newNotes, setNewNotes,
  onAddTask 
}: AddTaskFormProps) {
  return (
    <form onSubmit={onAddTask} className="space-y-4 mb-6">
      <div>
        <Label htmlFor="task-description" className="sr-only">Task Description</Label>
        <Input
          id="task-description"
          type="text"
          placeholder="Enter new task description..."
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          aria-label="New task description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="task-duedate" className="block text-sm font-medium mb-1">Due Date (Optional)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="task-duedate"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !newDueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {newDueDate ? format(newDueDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={newDueDate}
                onSelect={setNewDueDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="task-priority" className="block text-sm font-medium mb-1">Priority</Label>
          <Select value={newPriority} onValueChange={(value) => setNewPriority(value as Priority)}>
            <SelectTrigger id="task-priority" className="w-full">
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

      <div>
        <Label htmlFor="task-notes" className="block text-sm font-medium mb-1">Notes (Optional)</Label>
        <Textarea
          id="task-notes"
          placeholder="Add any details or notes..."
          value={newNotes}
          onChange={(e) => setNewNotes(e.target.value)}
          rows={3}
        />
      </div>

      <Button type="submit" variant="default" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
        <Plus className="mr-2 h-4 w-4" /> Add Task
      </Button>
    </form>
  );
}
