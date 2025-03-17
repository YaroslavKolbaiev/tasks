import { z } from 'zod';
import { TaskStatus } from '../enums';

const createTaskFormSchema = z
  .object({
    title: z.string().min(3).max(100),
    description: z.string().min(0).max(500),
    status: z.nativeEnum(TaskStatus),
  });

export { createTaskFormSchema };
