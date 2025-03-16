import { taskController } from '../taskController';
import { prismaMock, req, res, task } from '../../../singleton';
import { ApiError } from '../../errors/ApiError';

describe('GET_TASKS', () => {
    it('should return tasks', async () => {
        prismaMock.task.findMany.mockResolvedValue([task]);
    
        await taskController.getTasks(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([task]);
    });
    
    it('should return a task', async () => {
        prismaMock.task.findUnique.mockResolvedValue(task);
    
        req.params = { id: '1' };
    
        await taskController.getTask(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(task);
    });
    
    it('should throw 404 if task not found', async () => {
        prismaMock.task.findUnique.mockResolvedValue(null);
    
        req.params = { id: '1' };
    
        try {
            await taskController.getTask(req, res);
        } catch (error: ApiError | any) {
            expect(error.status).toBe(404);
            expect(error.message).toBe('Not found');
        }
    });
});

describe('CREATE_TASK', () => {
    it('should create a task', async () => {
        prismaMock.task.create.mockResolvedValue(task);

        req.body = { title: 'Task 1', description: 'Description' };
    
        await taskController.createTask(req, res);
    
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(task);
    });
})