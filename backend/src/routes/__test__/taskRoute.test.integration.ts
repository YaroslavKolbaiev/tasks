import request from 'supertest';
import { app, server } from '../../index';
import prisma from '../../../client'; 
import { ApiError } from '../../errors/ApiError';
import { ValidateRequest, TaskStatus } from '../../enums';

const title = 'TEST_TASK';
const description = 'Description';
const subtaskTitle = 'Subtask';

async function cleanup(id: number | undefined) {
    await prisma.task.delete({
        where: { id }
    });
}

async function createTask() {
    return await prisma.task.create({
        data: {
            title,
            description
        }
    });
}

async function createSubtask(parentTaskId: number) {
    return await prisma.task.create({
        data: {
            title: subtaskTitle,
            description,
            parentTaskId
        }
    });
}

describe('GET_ROUTE', () => {
    afterAll(done => {
        server.close(done);
    });
    
    it('GET /tasks should return tasks', async () => {
        const response = await request(app)
          .get('/')
          .send()
          .expect(200);

        expect(response.body).toBeInstanceOf(Array);
    });

    it('GET /tasks/:id should return a task with subtasks', async () => {
        const task = await createTask();

        const subtask = await createSubtask(task.id);

        const response = await request(app)
          .get(`/task/${task.id}`)
          .send()
          .expect(200);

        expect(response.body).toMatchObject(
            { 
                title: task.title, 
                description: task.description, 
                subtasks: [{ title: subtask.title, description: subtask.description }] 
            }
        );

        await cleanup(task.id);
    });
});

describe('POST_ROUTE', () => {
    it('POST /tasks should create a task', async () => {
        const response = await request(app)
          .post('/task')
          .send({ title, description })
          .expect(201);

        expect(response.body).toMatchObject(
            { title, description }
        );

        const task = await prisma.task.findUnique({
            where: {id: response.body.id}
        });

        expect(task).toMatchObject(
            { title, description }
        );

        await cleanup(task?.id);
    });

    it('POST /subtasks should create a subtask', async () => {
        const task = await createTask();
        
        const subtusk = await request(app)
          .post('/subtask')
          .send({ title: subtaskTitle, description, parentTaskId: task.id })
          .expect(201);

        const taskFromDB = await prisma.task.findUnique({
            where: {id: task.id},
            include: { subtasks: true }
        });

        expect(taskFromDB?.subtasks[0]).toMatchObject({
            id: subtusk.body.id,
            title: subtusk.body.title,
            description: subtusk.body.description,
            status: subtusk.body.status,
        })

        await cleanup(task.id);
    });

    it('POST /tasks should throw 400 if title is not provided', async () => {
        try {
            await request(app)
              .post('/task')
              .send({ description })
              .expect(400);
        } catch (error: ApiError | any) {
            expect(error.status).toBe(400);
            expect(error.message).toBe(ValidateRequest.TITLE_REQUIRED);
        }
    });

    it('POST /tasks should throw 400 if description is not a text', async () => {
        try {
            await request(app)
              .post('/task')
              .send({ title, description: 1 })
              .expect(400);
        } catch (error: ApiError | any) {
            expect(error.status).toBe(400);
            expect(error.message).toBe(ValidateRequest.INVALID_DESCRIPTION);
        }
    
    });
});

describe('PUT_ROUTE', () => {
    it('PUT /tasks/:id should update a task', async () => {
        const task = await createTask();

        const response = await request(app)
          .put(`/task/${task.id}`)
          .send({ title: 'Updated', description: 'Updated', status: TaskStatus.IN_PROGRESS })
          .expect(200);

        const taskFromDB = await prisma.task.findUnique({
            where: {id: task.id}
        });

        expect(taskFromDB).toMatchObject(
            { title: 'Updated', description: 'Updated', status: TaskStatus.IN_PROGRESS }
        );

        await cleanup(task.id);
    });

    it('PUT /tasks/:id should throw 400 if title is not provided', async () => {
        const task = await createTask();

        try {
            await request(app)
              .put(`/task/${task.id}`)
              .send({ title: null })
              .expect(400);
        } catch (error: ApiError | any) {
            expect(error.message).toBe(ValidateRequest.TITLE_REQUIRED);
        }

        await cleanup(task.id);
    });
});

describe('DELETE_ROUTE', () => {
    it('DELETE /tasks/:id should delete a task', async () => {
        const task = await createTask();

        await request(app)
          .delete(`/task/${task.id}`)
          .send()
          .expect(200);

        const taskFromDB = await prisma.task.findUnique({
            where: {id: task.id}
        });

        expect(taskFromDB).toBeNull();
    });

    it('DELETE /tasks/:id should delete a task with subtasks', async () => {
        const task = await createTask();

        const subtask = await createSubtask(task.id);

        await request(app)
          .delete(`/task/${task.id}`)
          .send()
          .expect(200);

        const taskFromDB = await prisma.task.findUnique({
            where: {id: subtask.id},
        });

        expect(taskFromDB).toBeNull();
    });

    it('DELETE /tasks/:id should return task object which was deleted', async () => {
        const task = await createTask();

        const response = await request(app)
          .delete(`/task/${task.id}`)
          .send()
          .expect(200);

        expect(response.body).toMatchObject(
            { title, description, id: task.id }
        );
    });
});