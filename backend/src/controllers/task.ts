import { Request, Response } from 'express';

async function getTasks(req: Request, res: Response) {
  try {
    const tasks = {
      tasks: [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description 1',
          done: false,
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Description 2',
          done: false,
        },
        {
          id: 3,
          title: 'Task 3',
          description: 'Description 3',
          done: false,
        },
      ],
    };
    res.send(tasks);
  } catch (error) {
    res.status(500);
  }
}

export const taskController = {
  getTasks,
};
