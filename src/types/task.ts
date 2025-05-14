export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  description: string;
  completed: boolean;
  dueDate?: string; // Store as YYYY-MM-DD string
  priority: Priority;
  notes?: string;
}
