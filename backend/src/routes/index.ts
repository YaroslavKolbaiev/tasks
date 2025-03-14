import { Router } from 'express';
import { taskController } from '../controllers/task.js';

export const taskRouter = Router();

taskRouter.get('/', taskController.getTasks);
