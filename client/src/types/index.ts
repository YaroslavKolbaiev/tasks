import { TaskStatus } from '../enums';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  subtasks: Task[] | [];
  parentTaskId?: number;
}

interface MutateTask {
  title: string;
  description?: string;
  status: TaskStatus;
  parentTaskId?: number;
}

interface CreateTaskForm {
  title: string;
  description?: string;
  status: TaskStatus;
}

export type { Task, MutateTask, CreateTaskForm };
