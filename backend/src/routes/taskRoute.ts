import { Router } from 'express';
import { taskController } from '../controllers/taskController';
import { catchError } from '../utils/catchError';
import { requireId, validateRequest } from '../middlewares';


export const taskRouter = Router();

taskRouter.get('/', catchError(taskController.getTasks));
taskRouter.get('/task/:id', catchError(requireId), catchError(taskController.getTask));
taskRouter.post('/task', catchError(validateRequest), catchError(taskController.createTask));
taskRouter.post('/subtask', catchError(validateRequest), catchError(taskController.createSubTask));
taskRouter.put('/task/:id', catchError(requireId), catchError(validateRequest), catchError(taskController.updateTask));
taskRouter.delete('/task/:id', catchError(requireId), catchError(taskController.deleteTask));
